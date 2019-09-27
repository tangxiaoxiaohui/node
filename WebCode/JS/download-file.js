// 文件本地下载操作
function download(content, filename) {
  let a = document.createElement('a');
  let blob = new Blob([content]);
  let url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url)
}

// 文件获取操作
function ajax(url, callback, options) {
  window.URL = window.URL || window.webkitURL;
  let xhr = new XMLHttpRequest();
  xhr.open('get', url, true);
  if (options.responseType) {
    xhr.responseType = options.responseType
  }
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      callback(xhr)
    }
  };
  xhr.send()
}
// 文件下载
export function downloadFile(url,filename) {
  ajax(url, function(xhr) {
    download(xhr.response, filename)
  }, {
    responseType: 'blob'
  })
}
