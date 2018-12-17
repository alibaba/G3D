var loader = (function () {
  function request(url, callback, type) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == XMLHttpRequest.DONE && xmlhttp.status === 200) { callback(xmlhttp.response); }
    };
    xmlhttp.open('GET', url, true);
    if (type) { xmlhttp.responseType = type; }
    xmlhttp.send();
  }
  function loadBlob(url, callback) { request(url, callback, 'arraybuffer'); }
  function loadText(url, callback) { request(url, callback); }
  function loadImage(url, callback) {
    var image = new Image(); image.onload = function () { callback(image); };
    image.crossOrigin = true; image.src = url;
  }
  function queue(load) {
    return function loadQueue(collection, callback) {
      if (Array.isArray(collection)) {
        var i = collection.length;
        var res = [];
        collection.forEach(function (item, index) {
          load(item, function (data) {
            i--; res[index] = data;
            if (i === 0) { callback(res); }
          })
        })
      } else {
        var keys = Object.keys(collection), map = {};
        loadQueue(keys.map(function (k) { return collection[k] }), function (res) {
          res.forEach(function (data, i) { map[keys[i]] = data; }); callback(map);
        });
      }
    }
  }
  var loadImageQueue = queue(loadImage);
  var loadTextQueue = queue(loadText);
  var loadBlobQueue = queue(loadBlob);
  return {
    loadText: loadText, loadImage: loadImage, loadBlob: loadBlob,
    loadImageQueue: loadImageQueue, loadTextQueue: loadTextQueue, loadBlobQueue: loadBlobQueue
  };
})();

export default loader;