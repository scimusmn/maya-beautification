/*
 * Change the language of text strings on the page.
 * Based on http://stackoverflow.com/a/13427846/1940172
*/
var dictionary, set_lang;

// Object literal behaving as multi-dictionary
dictionary = {
  "english": {
    "title": "Maya beautification",
    "intro_text": "The ancient Maya had standards of beauty that involved both temporary adornments and jewelry and permanent body modification.",
    "step1_instructions": "Look towards the webcam and tap the Take photo button when you're ready.",
    "take_photo": "Take photo",
    "choose_persona": "Choose a character:",
    "nobleman": "Noble man",
    "noblewoman": "Noble woman",
    "scribe": "Scribe",
    "baller": "Ball player",
    "soldier": "Soldier",
    "nobleman_text": "Noble man text",
    "noblewoman_text": "Noble woman text",
    "scribe_text": "A scribe is a person who writes books or documents by hand as a profession and helps the city keep track of its records. The profession, previously found in all literate cultures in some form, lost most of its importance and status with the advent of printing. The work could involve copying books, including sacred texts, or secretarial and administrative duties, such as taking of dictation and the keeping of business, judicial and, historical records for kings, nobles, temples, and cities.",
    "baller_text": "Sportsballplayer text",
    "soldier_text": "Soldier text",
    "drag": "Drag items from below onto your picture.",
    "resize": "You can resize items by pinching or stretching them with two or more fingers.",
    "retake_photo": "Retake photo"
  },
  "spanish": {
    "title": "Embellecimiento Maya",
    "intro_text": "Los antiguos mayas tenían estándares de belleza que participan tanto temporales adornos y joyas y la modificación corporal permanente.",
    "step1_instructions": "Mira hacia la cámara y pulse el botón Tomar foto cuando estés listo.",
    "take_photo": "Tome la foto",
    "choose_persona": "Elige un personaje:",
    "nobleman": "Noble",
    "noblewoman": "Aristócrata",
    "scribe": "Escriba",
    "baller": "Jugador de la bola",
    "soldier": "Soldado",
    "nobleman_text": "Spanish - Noble man text",
    "noblewoman_text": "Spanish - Noble woman text",
    "scribe_text": "Un escriba es una persona que escribe libros o documentos a mano como una profesión y ayuda a la ciudad a mantener un seguimiento de sus expedientes. La profesión, previamente encontrado en todas las culturas leer y escribir en una cierta forma, perdió la mayor parte de su importancia y el estado con la aparición de la imprenta. El trabajo podría implicar copiar libros, incluyendo los textos sagrados, o funciones de secretaría y administrativos, como la toma de dictado y estado de conservación de los negocios, judiciales, registros históricos y de reyes, nobles, templos y ciudades.",
    "baller_text": "Spanish - Sportsballplayer text",
    "soldier_text": "Spanish - Soldier text",
    "drag": "Arrastre los elementos de abajo en su imagen.",
    "resize": "Usted puede cambiar el tamaño de los elementos pellizcando o estiramiento con dos o más dedos.",
    "retake_photo": "Retomar foto"
  }
};


$(function () {
  "use strict";

  // Function for swapping dictionaries
  set_lang = function (dictionary) {
    $('[data-translate]').text(function () {
      var key = $(this).data('translate');
      if (dictionary.hasOwnProperty(key)) {
        return dictionary[key];
      }
    });
  };

  // Swap languages when menu changes
  $('div#lang span').click(function() {
    $('div#lang span').not(this).removeClass('selected');
    var language = $(this).text().toLowerCase();
    if (dictionary.hasOwnProperty(language)) {
      set_lang(dictionary[language]);
    }
    $(this).addClass('selected'); // Toggle button class

  });

  // Set initial language to English
  set_lang(dictionary.english);

});

