navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.getUserMedia;
window.URL = window.URL || window.webkitURL;

var app = document.getElementById('app');
var video = document.getElementById('monitor');
var canvas = document.getElementById('photo');
var gallery = document.getElementById('gallery');
var ctx = canvas.getContext('2d');

function gotStream(stream) {
  if (window.URL) {
    video.src = window.URL.createObjectURL(stream);
  } else {
    video.src = stream; // Opera.
  }

  video.onerror = function(e) {
    stream.stop();
  };

  stream.onended = noStream;

  video.onloadedmetadata = function(e) { // Not firing in Chrome. See crbug.com/110938.
    document.getElementById('splash').hidden = true;
    document.getElementById('app').hidden = false;
  };

  // Since video.onloadedmetadata isn't firing for getUserMedia video, we have
  // to fake it.
  setTimeout(function() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    document.getElementById('splash').hidden = true;
    document.getElementById('app').hidden = false;
  }, 50);
}

function noStream(e) {
  var msg = 'No camera available.';
  if (e.code == 1) {
    msg = 'User denied access to use camera.';
  }
  document.getElementById('errorMessage').textContent = msg;
}

function capture() {
  ctx.drawImage(video, 0, 0);
  var img = document.createElement('img');
  img.src = canvas.toDataURL('image/webp');
  gallery.appendChild(img);
}

function init(el) {
  if (!navigator.getUserMedia) {
    document.getElementById('errorMessage').innerHTML = 'Sorry. <code>navigator.getUserMedia()</code> is not available.';
    return;
  }
  el.onclick = capture;
  el.textContent = 'Snapshot';
  navigator.getUserMedia({video: true}, gotStream, noStream);
}
