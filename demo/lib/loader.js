function loadBlob(url, callback) {
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == XMLHttpRequest.DONE) {
      if (xmlhttp.status == 200) {
        callback(xmlhttp.response);
      } else if (xmlhttp.status == 400) {
        throw new Error('There was an error 400');
      } else {
        throw new Error('something else other than 200 was returned');
      }
    }
  };

  xmlhttp.open('GET', url, true);
  xmlhttp.responseType = 'arraybuffer';
  xmlhttp.send();
}

function loadText(url, callback) {

  var xmlhttp = new XMLHttpRequest();


  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == XMLHttpRequest.DONE) {
      if (xmlhttp.status == 200) {
        callback(xmlhttp.responseText);
      } else if (xmlhttp.status == 400) {
        throw new Error('There was an error 400');
      } else {
        throw new Error('something else other than 200 was returned');
      }
    }
  };

  xmlhttp.open('GET', url, true);
  // xmlhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
  xmlhttp.send();
}

function loadImage(url, callback) {

  const image = new Image();
  image.crossOrigin = true;

  image.onload = function () {
    callback(image);
  };

  image.src = url;
}



function loadImageQueue(urlMap, callback) {

  const len = Object.keys(urlMap).length;

  const imageMap = {};
  let i = 0;

  Object.keys(urlMap).forEach((k) => {

    const url = urlMap[k];

    loadImage(url, (image) => {

      imageMap[k] = image;

      i++;

      if (i === len) {
        callback(imageMap);
      }

    })

  })
}


function loadTextQueue(urls, callback) {

  let loadCount = 0;
  const res = [];

  console.log(urls);

  urls.forEach((url, i) => {


    loadText(url, text => {
      res[i] = text;
      loadCount++;

      if (loadCount === urls.length) {
        callback(res);
      }

    });
  });
}



export default { loadText, loadImage, loadBlob, loadImageQueue, loadTextQueue };