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

  // Not firing in Chrome. See crbug.com/110938.
  video.onloadedmetadata = function(e) {
    document.getElementById('step-1').hidden = true;
    document.getElementById('app').hidden = false;
  };

  // Since video.onloadedmetadata isn't firing for getUserMedia video, we have
  // to fake it.
  setTimeout(function() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    document.getElementById('step-1').hidden = true;
    document.getElementById('app').hidden = false;
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
 * When the snapshot button is clicked, use the canvas to store the image.
 * Then set it as the source for the image and append it to the gallery div.
 */
function capture() {
  ctx.drawImage(video, 0, 0);
  var img = document.createElement('img');
  img.src = canvas.toDataURL('image/webp');
  $('#gallery').append(img).fadeIn('slow');

  // Hide video stream and "take photo" button
  $('.container, button').hide();

  // Show step 2
  setTimeout(function() {
    step_two();
  }, 300);

}

/**
 * When the page loads, see if the browser can run the camera.
 * And if so, let it rain.
 */
function init(el) {
  if (!navigator.getUserMedia) {
    document.getElementById('errorMessage').innerHTML = 'Sorry. <code>navigator.getUserMedia()</code> is not available.';
    return;
  }
  el.onclick = capture;
  navigator.getUserMedia({video: true}, gotStream, noStream);

  // Give the camera a second to start up, then change the button text
  setTimeout(function() {
    el.textContent = 'Take photo';
  }, 800);
}

/**
 * Update the visible interface elements for step 2
 */
function step_two() {
  $('#gallery img').attr('id', 'droppable');

  // Show beautification options
  $('#options').fadeIn(500);

  // Make beauty options draggable and resizable
  $items = $('#options-wrapper div');
  $items.draggable();
  $('#options-wrapper div img').resizable({
    aspectRatio: true
  });

  // Drop zone on the photo
  $('#droppable').droppable();
}
