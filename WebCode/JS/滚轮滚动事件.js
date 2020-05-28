//  注册滚轮事件
export function setScrollEvent(element, callback) {
  if (document.addEventListener) {
    // webkit
    element.addEventListener('mousewheel', (e) => {
      callback(e, scrollFunc())
    }, false);
    // firefox
    element.addEventListener('DOMMouseScroll', (e) => {
      callback(e, scrollFunc())
    }, false);
  } else if (window['attachEvent']) {//IE
    element['attachEvent']('onmousewheel', (e) => {
      callback(e, scrollFunc())
    });
  }
}

// 滚动事件
function scrollFunc(e) {
  console.log('e', e)
  e = e || window.event;
  // e.wheelDelta 判断浏览器IE，谷歌滑轮事件
  // e.detail Firefox滑轮事件
  // > 0 向上滚动, < 0 向下滚动
  return e.wheelDelta || e.detail
}