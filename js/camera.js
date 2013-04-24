/**
 * Use the computer's webcam to capture an image
 */

// getUserMedia is currently vendor prefixed
navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.getUserMedia;
window.URL = window.URL || window.webkitURL;

// set some variables
var app = document.getElementById('app');
var video = document.getElementById('monitor');
var canvas = document.getElementById('photo');
var gallery = document.getElementById('gallery');
var ctx = canvas.getContext('2d');

$(document).ready(function() {
  init();
});

// Get the video stream, and set it as the video source
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

  // Set the canvas to the size of the captured video
  setTimeout(function() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
  }, 50);
}

/**
 * Fallback for errors
 */
function noStream(e) {
  var msg = 'No camera available.';
  if (e.code == 1) {
    msg = 'User denied access to use camera.';
  }
  document.getElementById('errorMessage').textContent = msg;
}

/**
 * This runs when the user taps "Click Photo"
 */
function capture() {
  // When the snapshot button is clicked, use the canvas to store the image.
  ctx.drawImage(video, 0, 0);
  var img = document.createElement('img');
  img.src = canvas.toDataURL('image/webp');

  // Then set it as the source for the image and append it to the gallery div
  $('#gallery').append(img).fadeIn('slow');

  // Hide step 1, show step 2
  document.getElementById('step-1').hidden = true;
  document.getElementById('step-2').hidden = false;

  // Turn on the jQuery UI interactions
  activate_ui();

}

/**
 * When the page loads, see if the browser can run the camera.
 * And if so, let it rain.
 */
function init() {
  if (!navigator.getUserMedia) {
    document.getElementById('errorMessage').innerHTML = 'Sorry. <code>navigator.getUserMedia()</code> is not available.';
    return;
  }
  navigator.getUserMedia({video: true}, gotStream, noStream);
}

/**
 * Initialize jQuery UI interactions
 */
function activate_ui() {

  $('#gallery img').attr('id', 'droppable');

  // Show beautification options
  $('#options').fadeIn(500);

  // Make beauty options draggable and resizable
  $items = $('#options-wrapper div');
  $items.draggable();
  $('#options-wrapper div img').resizable({
    aspectRatio: true,
    handles: "n, e, s, w, ne, se, sw, nw",
    containment: "#gallery"
  });

  // Drop zone on the photo
  $('#droppable').droppable();
}

