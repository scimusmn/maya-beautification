/**
 * UI-related functionality custom for the Maya beautification component.
 * Once camera.js has a photo of the visitor, functions from this file are called.
 * These functions initialize and configure jQuery UI interactions which allow the visitor
 * to drag, drop, resize, and flip items from a piece of Mayan artwork onto their own photo.
 */

/**
 * Initialize jQuery UI plugins and persona navigation.
 * This is called once we have an image of the visitor ready.
 */
var activate_ui = function() {

  // Show the Retake and Hide Outlines buttons
  $('button.small').not('#show').show();

  // Define the toolbox, and make it draggable
  $('#toolbox').draggable({
    containment: '#gallery'
  });

  // Turn on the item edit tools
  $('section img').dblclick(function() {
    item_editor(this);
  });

  // Make beauty options draggable
  $('section img').draggable({
    containment: '#draggable-wrapper'
  });

  // Drop zone on the photo
  var editInfo = 0;
  $('#gallery').droppable({
    drop: function(event, ui) {
      ui.draggable.addClass('dropped');
      editInfo++;
      // Show the edit info tip on the first drop
      if (editInfo === 1) {
        $('div#edit_info').fadeIn(800); // show the info
        // hide the info when the close button is tapped
        $('#edit_info button').click(function() {
          $('div#edit_info').fadeOut(400);
        });
      }
    }
  });
  // Drop zone on the artwork
  $('section.persona').droppable({
    drop: function(event, ui) {
      ui.draggable.removeClass('dropped');
    }
  });

  // Enable navigation between personas
  persona_nav();

}

/**
 * Show tools for editing items.
 */
var item_editor = function(activeItem) {

  var $activeItem = $(activeItem),
      $toolbox = $('#toolbox');

  // Show border around activeItem
  $activeItem.addClass('activeItem');

  // Show the toolbox
  $toolbox.fadeIn('fast');

  // Close the toolbox when the X is clicked
  $('span#close').click(function() {
    $toolbox.fadeOut('fast');
    $activeItem.removeClass('activeItem');
  });

}

/**
 * Click handlers for toolbox buttons.
 */
$(function() {

  // Flip button
  $('div#flip').click(function () {
    $('.activeItem').toggleClass('flipped');
  });

  // Resize buttons
  $('#bigger, #smaller').click(function() {
    var newSizes = resizeImage($('.activeItem'), this.id);
    $('.activeItem').animate({
      height: newSizes.height,
      width: newSizes.width
    });
  });

  // Hide/show outlines
  $('#hide').click(function() {
    $('section img').not('.dropped').css({
      'border': 'none',
      'padding': '3px'
    });
    $(this).fadeOut(200, function() {
      $('#show').fadeIn(200);
    });
  });
  $('#show').click(function() {
    $('section img').not('.dropped').css({
      'border': '3px solid yellow',
      'padding': '0px'
    });
    $(this).fadeOut(200, function() {
      $('#hide').fadeIn(200);
    });
  });

  // Done button - clear the screen and show just the photo
  $('#done').click(function() {
    showPhoto();
  });

});

/**
 * Persona navigation.
 * When a persona option is tapped, load that section's text and beauty options.
 */
var persona_nav = function() {

  // Update visible elements when an option is clicked
  $('ul#characters li').click(function() {

    $('.active').removeClass('active');
    $(this).addClass('active');

    // Hide currently visible persona text and items, then show the new ones
    $('#draggable-wrapper section:visible').add('p.persona:visible').fadeOut(200, function() {
      $('p.' + $('ul#characters li.active').attr('id')).fadeIn(700);
      $('section#' + $('ul#characters li.active').attr('id')).fadeIn(700);
    });

    console.log('Persona changed to ' + $('ul#characters li.active').attr('id'));

  });

}

/**
 * When the user hits "Done," clear the screen and just show their photo.
 */
var showPhoto = function() {
  var selected_persona = $('ul#characters li.active').attr('id');

  // Hide everything except the user photo and their chosen objects
  // Then show some text or something

}

/**
 * Resize an image while maintaining its aspect ratio.
 * @param $img - jQuery object representing an image
 * @param direction - string - either "bigger" or "smaller"
 * @return newSizes - object with new height and width
 */
var resizeImage = function($img, direction) {

  // Figure out the original size of the image
  var origSizes = {
    height: $img.height(),
    width: $img.width()
  };

  // Figure out the new sizes. With math!
  var newWidth;
  if (direction === 'bigger') {
    newWidth = origSizes.width + 50;
  } else if (direction === 'smaller') {
    newWidth = origSizes.width - 50;
  }

  newHeight = (newWidth * origSizes.height) / origSizes.width;

  // Put the newSizes into an object
  var newSizes = {
    height: newHeight,
    width: newWidth
  }

  // console.log('New height ' + newSizes.height + ' / New width: ' + newSizes.width);
  return newSizes;

}
