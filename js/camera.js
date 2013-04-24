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
  // When the snapshot button is clicked, use the canvas to store the image.
  ctx.drawImage(video, 0, 0);
  var img = document.createElement('img');
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
 * Initialize jQuery UI interactions
 */
function activate_ui() {

  $('#gallery img').attr('id', 'droppable');

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

  // Enable navigation between personas
  persona_nav();

}

/**
 * Persona selection
 * When a persona option is tapped, load that section's text and beauty options
 */
function persona_nav() {

  // Show default option first
  var selected_persona_name = 'Scribe'; // @TODO - Add to config file if there ends up being one?
      selected_persona_id = name_to_id(selected_persona_name);

  // Set the default's menu item active. Show the title, text and items.
  $('li#' + selected_persona_id).add('div.' + selected_persona_id).addClass('active');
  $('h3#active-character').text(selected_persona_name);
  $('p.' + selected_persona_id).show();
  $('#options-wrapper div').not('.active, .ui-wrapper').hide();

  // Update visible elements when an option is clicked
  $('ul#characters li').click(function() {

    // Hide currently visible persona text and items
    $('p.persona').hide();
    $('#options-wrapper div').hide();

    // Toggle the "active" class
    $('li.active').removeClass('active');
    $(this).addClass('active');

    // Update the variables
    var selected_persona_name = $(this).text(),
        selected_persona_id = name_to_id(selected_persona_name);

    // Update the text
    $('h3#active-character').text(selected_persona_name);
    $('p.' + selected_persona_id).fadeIn('fast');

    // Show the correct items
    $('#options-wrapper div.' + selected_persona_id).add('#options-wrapper div.' + selected_persona_id + ' div').show();

  });

}

/**
 * Given a persona name, return an ID.
 * This just makes everything lowercase and removes spaces.
 */
function name_to_id(name) {
  var name = name.toLowerCase().replace(/\s+/g, '');
  return name;
}

