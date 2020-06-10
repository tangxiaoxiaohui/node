let eventMap = new Map();

//  注册滚轮事件
export function setScrollEvent(element, callback) {
  eventMap.set(element, (e) => {
    callback(e, scrollFunc())
  });
  if (document.addEventListener) {
    // webkit
    element.addEventListener('mousewheel', eventMap.get(element), false);
    // firefox
    element.addEventListener('DOMMouseScroll', eventMap.get(element), false);
  } else if (window['attachEvent']) {//IE
    element['attachEvent']('onmousewheel', eventMap.get(element));
  }
}

// 解绑滚轮滚动事件
export function clearScrollEvent(element) {
  if (document.addEventListener) {
    // webkit
    element.removeEventListener('mousewheel', eventMap.get(element));
    // firefox
    element.removeEventListener('DOMMouseScroll', eventMap.get(element));
  } else if (window['attachEvent']) {//IE
    element['detachEvent']('onmousewheel', eventMap.get(element));
  }
}

// 滚动事件
function scrollFunc(e) {
  // console.log('e', e);
  e = e || window.event;
  // e.wheelDelta 判断浏览器IE，谷歌滑轮事件
  // e.detail Firefox滑轮事件
  // > 0 向上滚动, < 0 向下滚动
  return e.wheelDelta || e.detail
}
