/*
 * Change the language of text strings on the page.
 * Based on http://stackoverflow.com/a/13427846/1940172
*/
var dictionary, set_lang;

// Object literal behaving as multi-dictionary
dictionary = {
  "english": {
    "title": "The ancient Maya had standards of beauty that involved both temporary adornments and jewelry and permanent body modification.",
    "intro_text": "Beauty, for the ancient Maya, was more than skin deep. From elegant jewelry and clothing to modified skulls and teeth inlaid with precious stones, Maya beautification could signify social status or establish a connection with the divine. And sometimes, of course, it was just for looking good.",
    "step1_instructions": "Look towards the webcam and tap the Take photo button when you're ready. You will have 5 seconds to get into position after hitting the button.",
    "take_photo": "Take photo",
    "choose_persona": "Choose a persona, then drag highlighted items from the artwork below onto your photo.",
    "nobleman": "Noble man",
    "noblewoman": "Noble woman",
    "scribe": "Scribe",
    "baller": "Ball player",
    "soldier": "Soldier",
    "nobleman_text": "Nobles like Lord Pakal of Palenque probably went further than the average ancient Maya person in decorating and modifying their bodies. A powerful lord would have connected himself to the gods by mimicking their features on his body—Pakal had a sloping forehead and tasseled hair, like the corncob head of the Maize God, and his depictions show him with crossed eyes, like the sun god.",
    "noblewoman_text": "Lady Xoc of Yaxchilán was one of the most powerful and prominent women in the ancient Maya civilization, and it shows in her appearance. Along with the elaborate headdresses and jewelry often worn by Maya noble women, depictions of Lady Xoc show elegant, curled lines surrounding her mouth—these were likely tattooed on her face to symbolize her eloquent speech.",
    "scribe_text": "Classic Period scribes were probably most often priests or members of noble families, and their skills were highly valued. Depictions of these high-ranking members of the court often show them in a distinctive outfit of a sarong and headcloth with writing implements near at hand, sometimes tucked into their headdresses.",
    "baller_text": "The ornaments and equipment Maya ball players wore probably varied by the location and occasion of each game, but they certainly wore decorative elements in addition to the protection for their knees, elbows and hips. Maya art shows players wearing large, flower shaped ear spools, necklaces, pierced septums, and headdresses that may have represented animal counterparts.",
    "soldier_text": "A Maya soldier’s practical battle kit might include spears, axes, clubs, shields, and quilted cotton armor stuffed with rock salt, but they also decorated themselves for war. Murals show soldiers in full body paint, with black, red or striped bodies, and fierce expressions painted around their eyes and noses. Some officers may also have worn elaborate headdresses, to connect them to warrior lineages or military orders.",
    "retake_photo": "Retake photo"
  },
  "spanish": {
    "title": "Los antiguos mayas tenían estándares de belleza que participan tanto temporales adornos y joyas y la modificación corporal permanente.",
    "intro_text": "Belleza, para los antiguos mayas, fue más allá de la piel. Desde elegantes joyas y ropa de los cráneos y dientes con incrustaciones de piedras preciosas modificados, embellecimiento Maya podría significar la condición social o establecer una conexión con lo divino. Y a veces, por supuesto, era sólo para estar guapa.",
    "step1_instructions": "Mira hacia la cámara y pulse el botón Tomar foto cuando estés listo. Usted tendrá 5 segundos para entrar en posición después de presionar el botón.",
    "take_photo": "Tome la foto",
    "choose_persona": "Elige un personaje:",
    "nobleman": "Noble",
    "noblewoman": "Aristócrata",
    "scribe": "Escriba",
    "baller": "Jugador de la bola",
    "soldier": "Soldado",
    "nobleman_text": "Nobles como Señor Pakal de Palenque probablemente iban más allá de los antiguos mayas persona promedio en la decoración y la modificación de sus cuerpos. Un poderoso señor habría conectado a sí mismo a los dioses mediante la imitación de sus funciones en el cuerpo-Pakal tuvo una frente inclinada y el pelo adornado con borlas, como la cabeza de mazorca de maíz del Dios del Maíz, y sus pinturas lo muestran con los ojos cruzados, como el dios del sol.",
    "noblewoman_text": "Señora Xoc de Yaxchilán era una de las mujeres más poderosas y prominentes en la antigua civilización Maya, y se nota en su apariencia. Junto con los elaborados tocados y joyas a menudo usados por las mujeres nobles mayas, las representaciones de la señora Xoc muestran elegante, se cerraron las líneas que rodean la boca, estos probablemente fueron tatuados en su rostro como símbolo de su elocuente discurso.",
    "scribe_text": "Periodo Clásico escribas eran probablemente más a menudo sacerdotes o miembros de familias nobles, y sus habilidades fueron muy valorados. Las representaciones de estos miembros de alto rango de la corte a menudo los muestran con un traje distintivo de un pareo y turbante con instrumentos de escritura a la mano, a veces escondido en sus tocados.",
    "baller_text": "Los adornos y equipos Maya jugadores de la bola llevaban probablemente variada por el lugar y la ocasión de cada juego, pero ciertamente llevaban elementos decorativos además de la protección de sus rodillas, codos y caderas. Arte maya muestra a los jugadores que llevan grandes carretes de flores en forma de oreja, collares, tabiques perforados, y tocados que pueden haber representado contrapartes animales.",
    "soldier_text": "Kit batalla práctica de un soldado Maya podría incluir lanzas, hachas, palos, escudos y armaduras de algodón acolchado relleno de sal de roca, pero también decorada para la guerra. Murales muestran soldados en la pintura de cuerpo completo, con cuerpo negro, rojo o rayas, y expresiones feroces pintados alrededor de los ojos y la nariz. Algunos agentes también pueden haber llevado elaborados tocados, para conectarlos a los linajes guerrero u órdenes militares.",
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

