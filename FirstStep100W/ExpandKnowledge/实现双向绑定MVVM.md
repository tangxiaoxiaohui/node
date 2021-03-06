# 实现Observer

## 监听值的变化
​	

```javascript
function observer(data) {
  if (!(typeof data === 'object')) {
    return;
  }
  Object.keys().forEcah(key => {
    defineReactive(data, key, data[key]);
  });
  defineReactive(data);
}

function defineReactive(data, key, value) {
  observer(data);
  Object.defineProperty(data, key, {
    enumerber: true,
    configuraber: false,
    get() {
      return value;
    },
    set(newValue) {
      console.log('监听到值变化 ', value, ' ==> ', newValue);
      value = newVal;
    }
  })
}

var data = {name: 'xiaohui'};
observe(data);
data.name = 'xiaoyu';
```




	## 消息订阅器(Dep)/订阅者(Watcher)
​		

```javascript
function defineReactive(data, key, value) {
  var dep = new Dep();
  observer(data);
  Object.defineProperty(data, key, {
    enumerber: true,
    configuraber: false,
    get() {
      Dep.target && dep.addDep(Dep.target);
      return value;
    },
    set(newValue) {
      console.log('监听到值变化 ', value, ' ==> ', newValue);
      value = newVal;
    }
  })
}

function Dep() {
  this.subs = [];
}

Dep.prototype = {
  addSub: function (sub) {
    this.subs.push(sub);
  },
  notify: function () {
    this.subs.forEach(function (sub) {
      sub.update();
    });
  }
};

Watcher.prototype = {
  get: function (key) {
    Dep.target = this;
    this.value = data[key];    // 这里会触发属性的getter，从而添加订阅者
    Dep.target = null;
  }
};
```



	## 监听器实例
​		

```javascript
function Observer(data) {
  this.data = data;
  this.walk(data);
}

Observer.prototype = {
  walk: function (data) {
    var me = this;
    Object.keys(data).forEach(function (key) {
      me.convert(key, data[key]);
    });
  },
  convert: function (key, val) {
    this.defineReactive(this.data, key, val);
  },

  defineReactive: function (data, key, val) {
    var dep = new Dep();
    var childObj = observe(val);

    Object.defineProperty(data, key, {
      enumerable: true, // 可枚举
      configurable: false, // 不能再define
      get: function () {
        if (Dep.target) {
          dep.depend();
        }
        return val;
      },
      set: function (newVal) {
        if (newVal === val) {
          return;
        }
        val = newVal;
        // 新的值是object的话，进行监听
        childObj = observe(newVal);
        // 通知订阅者
        dep.notify();
      }
    });
  }
};

function observe(value, vm) {
  if (!value || typeof value !== 'object') {
    return;
  }

  return new Observer(value);
};


var uid = 0;

function Dep() {
  this.id = uid++;
  this.subs = [];
}

Dep.prototype = {
  addSub: function (sub) {
    this.subs.push(sub);
  },

  depend: function () {
    Dep.target.addDep(this);
  },

  removeSub: function (sub) {
    var index = this.subs.indexOf(sub);
    if (index != -1) {
      this.subs.splice(index, 1);
    }
  },

  notify: function () {
    this.subs.forEach(function (sub) {
      sub.update();
    });
  }
};

Dep.target = null;		
```

 

