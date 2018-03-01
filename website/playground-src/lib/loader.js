function loadBlob(url, callback) {
    var xmlhttp = new XMLHttpRequest();
  
    xmlhttp.onreadystatechange = function() {
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
  
    xmlhttp.onreadystatechange = function() {
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
    xmlhttp.send();
  }
  
  function loadImage(url, callback) {
  
    const image = new Image();
    image.crossOrigin = true;
  
    image.onload = function() {
  
    };
  
    image.src = url;
  }
  
  export { loadText, loadImage, loadBlob };