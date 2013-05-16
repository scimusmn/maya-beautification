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
function activate_ui() {

  // Make beauty options draggable and resizable
  $items = $('#options-wrapper div.item');
  $items.draggable();

  // Drop zone on the photo
  $('.droppable').droppable();

  // Turn on the item edit tools
  $('.item').dblclick(function() {
    var activeItem = this;
    item_editor(activeItem);
  });

  // Enable navigation between personas
  persona_nav();

}

/**
 * Persona navigation.
 * When a persona option is tapped, load that section's text and beauty options.
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
    $('p.' + selected_persona).fadeIn('fast');

  });

}

/**
 * Tools to edit an item.
 * Items can be resized, rotated, or flipped horizontally.
 */
var item_editor = function(activeItem) {

  // Edit tools
  var $toolbox = $('#toolbox');

  // Show the toolbox near the selected item
  $toolbox.prependTo(activeItem);
  $toolbox.fadeIn('fast');

}


