/*
 * Change the language of text strings on the page.
 * Based on http://stackoverflow.com/a/13427846/1940172
*/
var dictionary, set_lang;

// Object literal behaving as multi-dictionary
dictionary = {
  "english": {
    "how": "How would you look in ancient Maya fashions?",
    "intro_text": "From elegant jewelry and clothing to permanently altered skull shapes and teeth inlaid with precious stones, ancient Maya marks of beauty held important meanings. They could signify social status, establish a connection with the divine, or simply help a person look good.",
    "step1_instructions": "Tap the ",
    "step1_instructions_pt2": " button, and then face to the side.",
    "take_photo": "take photo",
    "choose_persona": "Click a character tab, and then drag highlighted items onto your photo.",
    "intro_step2": "Standards of beauty have changed since the time of the ancient Maya, but their art shows us how they dressed and decorated themselves. How would you have looked as a prominent member of Maya society?",
    "nobleman": "Nobleman",
    "noblewoman": "Noblewoman",
    "scribe": "Scribe",
    "baller": "Ballplayer",
    "soldier": "Soldier",
    "nobleman_text": "Ancient Maya nobles decorated and modified their bodies extensively. A powerful lord connected himself to the gods by mimicking their features, perhaps with a sloping forehead and tasseled hair, like the corncob head of the Maize God, or with crossed eyes, like the Sun God.",
    "noblewoman_text": "Powerful Maya noblewomen adorned themselves to mark their status and influence. Renditions of a noblewoman might include elaborate headdresses and jewelry, as well as elegant curled lines surrounding her mouth. These were likely tattooed onto her face to symbolize her eloquent speech.",
    "scribe_text": "Most Classic Period scribes were probably priests or members of noble families, and their skills were highly valued. Depictions of scribes often show them in body paint a distinctive outfit including a wrap skirt and head cloth, with writing implements near at hand—sometimes tucked into their headdresses.",
    "baller_text": "Ancient murals show Maya ballplayers sporting not only protective equipment for their knees, elbows and hips, but also decorative elements. Under animal shaped headdresses, some players also wore flower shaped ear spools, large necklaces and nose piercings.",
    "soldier_text": "In addition to the weapons and armor they wore, Maya soldiers also decorated themselves for battle. Murals show soldiers with red and black striped bodies, and fierce expressions painted on their faces. Some officers may also have worn elaborate headdresses to signify rank or connect them to warrior lineages.",
    "retake_photo": "Retake photo",
    "hide_outlines": "Hide outlines",
    "show_outlines": "Show outlines",
    "bigger": "Bigger",
    "smaller": "Smaller",
    "flip": "Flip"
  },
  "español": {
    "how": "¿Cómo te verías tú a la antigua moda maya?",
    "intro_text": "Desde las joyas y ropa elegante hasta los cráneos permanentemente modificados y los dientes con incrustaciones de piedras preciosas, las antiguas marcas de belleza mayas poseían importantes significados. Podían significar estatus social, una conexión con lo divino, o simplemente ayudaban a que una persona se viera bien.",
    "step1_instructions": "Toca el botón de ",
    "step1_instructions_pt2": " y después ponte de perfil",
    "take_photo": "tomar foto",
    "choose_persona": "Haz clic en uno de los nombres de los personajes y después arrastra uno de los objetos resaltados hasta tu foto.",
    "intro_step2": "Los estándares de belleza han cambiado desde la época de los antiguos mayas, pero sus obras de arte nos muestran cómo se vestían y se adornaban. ¿Cómo te hubieras visto tú si fueras un prominente miembro de la sociedad maya?",
    "nobleman": "Señor Noble",
    "noblewoman": "Mujer Noble",
    "scribe": "Escriba",
    "baller": "Jugador de pelota",
    "soldier": "Soldado",
    "nobleman_text": "Los señores de la antigua nobleza maya se decoraban y se modificaban el cuerpo de manera considerable. Un señor poderoso se conectaba con los dioses imitando sus características, quizás con una frente inclinada y el pelo en flequillo, como la cabeza en forma de mazorca del Dios del Maíz, o con ojos bizcos, como el Dios Sol.",
    "noblewoman_text": "Las poderosas mujeres de la nobleza maya se adornaban para indicar su estatus e influencia. Las interpretaciones de una mujer noble pueden incluir elaborados tocados y joyas, así como elegantes líneas en espiral enmarcando su boca. Estas líneas probablemente se tatuaban sobre la cara para simbolizar su elocuente discurso.",
    "scribe_text": "La mayoría de los escribas del Período Clásico probablemente eran sacerdotes o miembros de las familias nobles, y sus habilidades eran muy apreciadas. Las representaciones de los escribas a menudo los muestran con pintura corporal, luciendo un atuendo característico que incluía una falda envuelta y un turbante de tela, junto con implementos de escritura a la mano, o algunas veces dentro de sus tocados.",
    "baller_text": "Los murales antiguos muestran a los jugadores de pelota mayas luciendo no solo un equipo protector para las rodillas, codos y caderas, sino también elementos decorativos. Debajo de los tocados en forma de animales que lucían, algunos jugadores también usaban orejeras, collares grandes y adornos  en las perforaciones de la nariz.",
    "soldier_text": "Además de las armas y la armadura que llevaban, los soldados mayas también se adornaban para la batalla. Los murales muestran a los soldados con los cuerpos pintados con rayas rojas y negras y expresiones feroces en sus rostros. Algunos oficiales, es posible que lucieran elaborados tocados que indicaban rango o los conectaban con linajes de guerreros.",
    "retake_photo": "Volver a tomar la foto",
    "hide_outlines": "Esconder los contornos",
    "show_outlines": "Mostrar los contornos",
    "bigger": "Más grande",
    "smaller": "Más pequeña",
    "flip": "Voltear"
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

    // Toggle body class
    if (language == 'english') {
      $('body').removeClass('spanish');
    } else {
      $('body').addClass('spanish');
    }

  });

  // Set initial language to English
  set_lang(dictionary.english);

});

