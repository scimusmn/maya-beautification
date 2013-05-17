/**
 * UI-related functionality custom for the Maya beautification component.
 * Once camera.js has a photo of the visitor, functions from this file are called.
 * These functions initialize and configure jQuery UI interactions which allow the visitor
 * to drag, drop, resize, and rotate items from a piece of Mayan artwork onto their own photo.
 *
 * @TODO:
 * - Some sort of cool animation/glow effect on draggable items in the artwork to indicate they're draggable.
 * - Show "Edit Item" tools when an item is double-tapped.
 * - Make the "Edit Item" tools: resize, rotate, flip horizontal
 * - Maybe add a Done button that "saves" the compiled image and displays it next to the artwork (like for a picture postcard)
 * - Maybe actually save that photo and allow it to be emailed.
 */

/**
 * Initialize jQuery UI plugins and persona navigation.
 * This is called once we have an image of the visitor ready.
 */
var activate_ui = function() {

  // Show the Retake button
  $('button.small').show();

  // Make beauty options draggable
  $('section img').draggable({
    containment: '#draggable-wrapper'
  });

  // Drop zone on the photo
  $('#gallery').droppable({
    drop: function(event, ui) {
      ui.draggable.addClass('dropped');
    }
  });
  // Drop zone on the artwork
  $('section.persona').droppable({
    drop: function(event, ui) {
      ui.draggable.removeClass('dropped');
    }
  });

  // Turn on the item edit tools
  $('section img').dblclick(function() {
    item_editor(this);
  });

  // Enable navigation between personas
  persona_nav();

}

/**
 * Tools to edit an item.
 * Items can be resized, rotated, or flipped horizontally.
 */
var item_editor = function(activeItem) {

  // Set some variables
  var $activeItem = $(activeItem), // jQuery object
      $toolbox = $('#toolbox'); // Edit tools

  // Show the toolbox
  $toolbox.fadeIn('fast');

  // Allow it to be draggable
  $toolbox.draggable({
    containment: '#gallery'
  });

  // @DEBUG
  console.log('Toolbox opened for ' + activeItem.id);

  // Flip button
  $('div#flip').click(function() {
    $activeItem.toggleClass('flipped');
    // @DEBUG
    console.log('Flipped ' + activeItem.id);
  });

  // Resize buttons
  // @TODO - less redundancy; figure out max/min
  $('div.resize #bigger').click(function() {
    // Figure out the current size
    var currentHeight = this.height(),
        currentWidth = this.width();
    // Animate it to 20px bigger
    $image.animate({
      height: currentHeight + 20,
      width: currentWidth + 20
    });
    // @DEBUG
    console.log('Enlarged ' + activeItem.id);
  });

  $('div.resize #smaller').click(function() {
    // Figure out the current size
    var currentHeight = this.height(),
        currentWidth = this.width();
    // Animate it to 20px smaller
    $image.animate({
      height: currentHeight - 20,
      width: currentWidth - 20
    });
    // @DEBUG
    console.log('Shrunk ' + activeItem.id);
  });

  // Close the toolbox when the X is clicked
  $('span#close').click(function() {
    $('#toolbox').fadeOut('fast');
  });

  // If a different item is clicked, update activeItem


}

/**
 * Persona navigation.
 * When a persona option is tapped, load that section's text and beauty options.
 */
var persona_nav = function() {

  var selected_persona = $('#characters li.active').attr('id');

  // Hide sections after the initial page load
  // Hiding them before, like with CSS, breaks drag/drop/resize since the item size can't be determined
  $('#draggable-wrapper section').not('.active').hide();

  // Update visible elements when an option is clicked
  $('ul#characters li').click(function() {

    // Hide currently visible persona text and items
    $('#draggable-wrapper section').hide();
    $('.active').not('li').hide();
    $('.active').removeClass('active');

    // Activate the new selection
    selected_persona = $(this).attr('id');
    var selected_persona_name = $(this).text();

    $('p.' + selected_persona).add('#' + selected_persona).addClass('active');
    $('#draggable-wrapper section#' + selected_persona + ' div').add('#draggable-wrapper section#' + selected_persona).show();

    // Update the text
    $('p.' + selected_persona).fadeIn('fast');

  });

}

