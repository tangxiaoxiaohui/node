/*
H5 打开高德地图
<a href="androidamap://navi?sourceApplication=appname&amp;poiname=fangheng&amp;lat=36.547901&amp;lon=104.258354&amp;dev=1&amp;style=2">导航</a>
*/

(function($, navigation) {

    navigation.getLocation = function(callback) {
        callback = callback || $.noop;
        plus.geolocation.getCurrentPosition(callback, function(e) {
            mui.toast("异常:" + e.message);
        });
    }

    function translatePoint(position) {
        //currentLon = position.coords.longitude;
        //currentLat = position.coords.latitude;
        //        local = position;
        //        if(showMap) {
        //            openMap(local);
        //        }
        console.log("-----------position" + JSON.stringify(position))
        return {
            currentLon: position.coords.longitude,
            currentLat: position.coords.latitude
        };
    }

   //如果导航只用这个方法久可以了，其它方法是为了备注以后可能用到的需求而保留的 。siteName是终点的文字描述。

    navigation.startNavigation = function(longitude, latitude,siteName) {
        //http://www.html5plus.org/doc/zh_cn/maps.html#plus.maps.CoordinateConvertOptions
        var wt = plus.nativeUI.showWaiting('正在获取当前位置');
        navigation.getLocation(function(position) {

            var point = new plus.maps.Point(longitude, latitude);
            var options = {
                coordType:"bd09ll"//源数据的坐标类型
            };
            plus.maps.Map.convertCoordinates(point, options, function(event) {//mui转换坐标系
                wt.close();
                var dst = event.coord; // 转换后的坐标值
                var src = new plus.maps.Point(position.coords.longitude, position.coords.latitude);
                // 调用系统地图显示
                plus.maps.openSysMap(dst, siteName, src);

            }, function(e) {
                alert("Failed:" + JSON.stringify(e));
            });

            //navigation.openMap(position, latitude, longitude);
        });
    }

    navigation.openMap = function(position, latitude, longitude) {
        var lat = latitude;
        var lng = longitude;
        //inspInfo.latitude = 30.335682;
        //inspInfo.longitude = 120.224934;
        //百度com.baidu.BaiduMap  高德com.autonavi.minimap 腾讯com.tencent.map
        //        if(navigation.judgeExists('com.baidu.BaiduMap')) {
        //            url = "http://api.map.baidu.com/direction?origin=latlng:" + position.coords.latitude + "," + position.coords.longitude + "|name:当前位置&destination=latlng:" + lat + "," + lng + "|name:终点&mode=driving&region=中国&output=html&src=项目名称";
        //        } else
        if(navigation.judgeExists('com.autonavi.minimap')) {
            //转换火星坐标系
            var gd = coordinate.bd09togcj02(position.coords.longitude, position.coords.latitude);
            var gd2 = coordinate.bd09togcj02(lng, lat);
            url = "http://uri.amap.com/navigation?from=" + gd[0] + "," + gd[1] + ",当前位置&to=" + gd2[0] + "," + gd2[1] + ",站点&mode=car&src=公司名称&callnative=1"

        } else if(navigation.judgeExists('com.tencent.map')) {
            //百度转gps坐标系
            var gd = coordinate.bd09towgs84(position.coords.longitude, position.coords.latitude);
            var gd2 = coordinate.bd09towgs84(lng, lat);
            url = "http://apis.map.qq.com/uri/v1/routeplan?type=drive&from=当前位置&fromcoord=" + gd[1] + "," + gd[0] + ",当前位置&to=站点&tocoord=" + gd2[1] + "," + gd2[0] + "&coord_type=1&referer=项目名称"

        } else {

            mui.toast('没有找到地图客户端');
            return;
        }
        //调用地图url
        var uri = encodeURI(url);
        //        plus.runtime.openURL(uri);
        //        mui.openWindow(uri);
    }

    /**
     * 判断客户端是否安装
     */
    navigation.judgeExists = function(packageName) {
        try {
            var main = plus.android.runtimeMainActivity();
            var packageManager = main.getPackageManager();
            var PackageManager = plus.android.importClass(packageManager);
            var packageInfo = packageManager.getPackageInfo(packageName, PackageManager.GET_ACTIVITIES);
            if(packageInfo) {
                //已安装
                return true;
            } else {
                //未安装
                return false;
            }
        } catch(e) {
            //未安装
            return false;
        }
    }

}(mui, window.navigation = {}));