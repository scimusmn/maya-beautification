/**
 * Use the computer's webcam to capture video of the visitor,
 * then use <canvas> to render it as an image.
*/

var video;
var canvas;
var context;
var imageFilter;

// Alias the vendor prefixed variants of getUserMedia so we can access them
// via navigator.getUserMedia
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia || navigator.msGetUserMedia;

// Alias the vendor prefixed variants of the URL object so that we can access them
// via window.URL
window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

// Alias the vendor prefixed variants of requestAnimationFrame so that we can access
// them via window.requestAnimationFrame fallback to setTimeout at 60hz if not supported.
window.requestAnimationFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          window.oRequestAnimationFrame      ||
          window.msRequestAnimationFrame     ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

// This function will be called if a webcam is available and the user has
// granted access for the web application to use it.
function successCallback(stream) {

  // Remove the preloader
  $('#preloader').remove();

  // Set the video source and play it
  video.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
  video.play();

  // Show the DOM elements that contain the rest of the UI
  document.querySelector("#monitor").style.display = "inline";

  // capture the first frame of video and start the animation loop that
  // continuously update the video to the screen
  update();
}

// This function will be called if there is no webcam available or the user has
// denied access for the web application to use it.
function failureCallback() {
  showStatus("No camera is available or you have denied access.");
}

function processImage() {
  if (canvas.width > 0 && canvas.height > 0) {
    if (imageFilter) {
      context.putImageData(imageFilter.apply(null, [context.getImageData(0, 0,
        canvas.width, canvas.height)]), 0, 0);
    }
  }
}

function processVideoFrame() {
  // We have to check for the video dimensions here.
  // Dimensions will be zero until they can be determined from the stream.
  if (context && video.videoWidth > 0 && video.videoHeight > 0) {
    // Resize the canvas to match the current video dimensions
    if (canvas.width != video.videoWidth)
      canvas.width = video.videoWidth;
    if (canvas.height != video.videoHeight)
      canvas.height = video.videoHeight;

    // Copy the current video frame by drawing it onto the canvas's context
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    processImage(canvas);
  }
}

function update(){
  processVideoFrame();
  requestAnimationFrame(update);
};

function onLoad() {

  // Get the DOM object that matches the first video tag on the page
  video = document.querySelector('video');

  canvas = document.querySelector("canvas");
  context = canvas.getContext("2d");

  // We can retrieve the video dimensions from the video object once we have
  // registered for and received the loadeddata event
  video.addEventListener('loadeddata', function(e) {
    console.log('loadeddata Video dimensions: ' + video.videoWidth + ' x ' + video.videoHeight);
    }, false);

  video.addEventListener('playing', function(e) {
    console.log('play Video dimensions: ' + video.videoWidth + ' x ' + video.videoHeight);
    }, false);

  if (navigator.getUserMedia) {
    // Ask the user for access to the camera
    navigator.getUserMedia({video: true}, successCallback, failureCallback);
  }
  else {
    showStatus('The navigator.getUserMedia() method not supported in this browser.');
  }
}


/**
 * This runs when the user taps "Click Photo"
 */
function capture() {

  var url = canvas.toDataURL();
  console.log(url);

  // Set the src of the image url to the data url
  document.querySelector('#gallery img').src = url;

  // Then set it as the source for the image and append it to the gallery div
  $('#gallery').fadeIn('slow');

  // Hide step 1, show step 2
  document.getElementById('step-1').hidden = true;
  document.getElementById('title').hidden = true;
  document.getElementById('who').hidden = false;
  $('#step-2').fadeIn(500);

  // Turn on the jQuery UI interactions
  activate_ui();

}

/**
 * Show a countdown after hitting the Take Photo button
 * This allows the visitor to step back from the camera
 * @param button - object this function is called from (needed to pass onto capture function)
 * @param seconds - int - number of seconds to countdown
 */
function countdown(button, seconds) {

  // Hide "Take photo" button
  $('#take-photo').fadeOut(500);

  // Run countdown
  var seconds_left = seconds;
  var interval = setInterval(function() {
    document.getElementById('timer').innerHTML = --seconds_left;

    if (seconds_left <= 0) {
      capture(button);
      clearInterval(interval);
    }
  }, 1000);

}
