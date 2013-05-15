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

// Start up the camera when the page loads
$(document).ready(function() {
  if (!navigator.getUserMedia) {
    document.getElementById('errorMessage').innerHTML = 'Sorry. <code>navigator.getUserMedia()</code> is not available.';
    return;
  }
  navigator.getUserMedia({video: true}, gotStream, noStream);
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

  // Use the canvas to store the image.
  ctx.drawImage(video, 0, 0);
  var img = document.createElement('img');
  // @BUG - This doesn't always work. Sometimes the src just turns up empty.
  img.src = canvas.toDataURL('image/webp');

  // Then set it as the source for the image and append it to the gallery div
  $('#gallery').append(img).fadeIn('slow');

  // Hide step 1, show step 2
  document.getElementById('step-1').hidden = true;
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

/**
 * Initialize jQuery UI interactions
 */
function activate_ui() {

  // Make beauty options draggable and resizable
  $items = $('#options-wrapper div.item');
  $items.draggable();

  // Drop zone on the photo
  $('.droppable').droppable();

  // Enable navigation between personas
  persona_nav();

}

/**
 * Persona selection
 * When a persona option is tapped, load that section's text and beauty options
 */
function persona_nav() {

  var selected_persona = $('#characters li.active').attr('id');

  // Hide sections after the initial page load
  // Hiding them before, like with CSS, breaks drag/drop/resize since the item size can't be determined
  $('#options-wrapper section').not('.active').hide();

  // Update visible elements when an option is clicked
  $('ul#characters li').click(function() {

    // Hide currently visible persona text and items
    $('#options-wrapper section').hide();
    $('.active').not('li').hide();
    $('.active').removeClass('active');

    // Activate the new selection
    selected_persona = $(this).attr('id');
    var selected_persona_name = $(this).text();

    $('p.' + selected_persona).add('#' + selected_persona).addClass('active');
    $('#options-wrapper section#' + selected_persona + ' div').add('#options-wrapper section#' + selected_persona).show();

    // Update the text
    $('h3#active-character').text(selected_persona_name);
    $('p.' + selected_persona).fadeIn('fast');

  });

}
