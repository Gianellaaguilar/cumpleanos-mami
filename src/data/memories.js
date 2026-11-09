// ============================================================
//  CONFIGURACIÓN DEL REGALO — personaliza aquí todo el contenido
// ============================================================
//
//  FOTOS: coloca las fotografías de tu mamá en la carpeta
//  `public/images/mami/` con los nombres indicados abajo
//  (foto-01.jpg, foto-02.jpg, ...). Pueden ser .jpg, .png o .webp;
//  solo cambia la ruta. Mientras no existan, se mostrará un
//  espacio decorativo indicando el nombre del archivo esperado.
//
//  MÚSICA: coloca tu pista de piano instrumental en
//  `public/music/piano.mp3`.

export const MAMI_NAME = "Mami";

export const MUSIC_SRC = "/music/piano.mp3";

// ---------- Textos de la tarjeta inicial ----------
export const introText = {
  front: "Para alguien muy especial...",
  frontHint: "Tengo una sorpresa preparada para ti. ¿Quieres descubrirla?",
  button: "Abrir mi sorpresa",
  welcome: "Bienvenida, Mami",
  welcomeSub: "Esto está hecho con todo mi amor, solo para ti.",
};

// ---------- Torta ----------
export const cakeText = {
  title: "¡Hoy celebramos a una persona maravillosa!",
  subtitle: "43 años de historias, amor y momentos inolvidables.",
  button: "Pedir un deseo",
  congrats: "¡Feliz cumpleaños, Mami!",
  congratsSub: "Que todos tus deseos se hagan realidad.",
  next: "Descubrir nuestros recuerdos",
};

// ---------- Portada del libro ----------
export const coverText = {
  sceneTitle: "Un detalle especial preparado solo para ti.",
  title: "Nuestra historia, mis recuerdos favoritos",
  subtitle: "Un pequeño libro para una persona inmensa en mi corazón",
  button: "Abrir nuestro libro",
};

// ---------- Páginas del álbum ----------
// Tipos de página: "photos" | "intro" | "quote" | "finale"
//  - layout: "single" (1 foto grande), "duo" (2 fotos), "collage" (3-4 fotos)
//  - secrets: mensajitos ocultos tras flores/corazones
export const albumPages = [
  {
    type: "intro",
    title: "Para ti, Mami",
    note: "Cada página guarda un pedacito de mi corazón...",
    text: "Entre estas hojas guardé los momentos que más atesoro de ti. "
      + "Pasa las páginas despacio: cada recuerdo fue elegido pensando en tu sonrisa.",
    reasons: {
      title: "3 cosas que amo de ti",
      items: [
        "Tu apoyo incondicional.",
        "Tu fuerza para sacar a la familia adelante.",
        "Tu inmenso cariño hacia mí.",
      ],
      finale: "...y mil razones más",
    },
    secrets: [{ icon: "flower", message: "¡Te quiero mucho!" }],
  },
  {
    type: "photos",
    layout: "single",
    title: "Una fotografía especial",
    note: "La primera de muchas...",
    photos: [
      { src: "/images/mami/foto-01.jpg", caption: "Mi persona favorita" },
    ],
    secrets: [{ icon: "heart", message: "Eres la más hermosa" }],
  },
  {
    type: "photos",
    layout: "duo",
    title: "Momentos en familia",
    note: "Días de alegría, cada momento es mejor junto a las personas que queremos",
    photos: [
      { src: "/images/mami/foto-02.jpg", caption: "Siempre juntas", label: "Nuestro viaje a Huancaya" },
      { src: "/images/mami/foto-03.jpg", caption: "Nuestra familia", label: "Los 18 de Ish" },
    ],
  },
  {
    type: "photos",
    layout: "duo",
    title: "Recuerdos juntas",
    note: "Contigo, todo es mejor",
    photos: [
      { src: "/images/mami/foto-04.jpg", caption: "Ese día inolvidable" },
      { src: "/images/mami/foto-05.jpg", caption: "Riendo contigo" },
    ],
    secrets: [{ icon: "flower", message: "Gracias por tanto amor" }],
  },
  {
    type: "photos",
    layout: "collage",
    title: "Momentos espontáneos",
    note: "Tus sonrisas favoritas",
    tag: "Cami siempre en las fotos, nuestra Carminchis",
    photos: [
      { src: "/images/mami/foto-06.jpg", caption: "Espontánea" },
      { src: "/images/mami/foto-07.jpg", caption: "Siendo tú" },
      { src: "/images/mami/foto-08.jpg", caption: "Qué alegría" },
    ],
  },
  {
    type: "quote",
    title: "Palabras que me recuerdan a ti",
    quotes: [
      "El amor de una madre es el jardín donde siempre florece el corazón.",
      "Gracias por enseñarme que la ternura también es una forma de fuerza.",
    ],
    photos: [
      { src: "/images/mami/foto-09.jpg", caption: "Mi refugio" },
    ],
  },
  {
    type: "photos",
    layout: "duo",
    title: "Pequeños tesoros",
    note: "Tus lindos recuerdos",
    photos: [
      { src: "/images/mami/foto-10.jpg", caption: "Familia y celebración" },
      { src: "/images/mami/foto-11.jpg", caption: "La mejor mamá" },
    ],
    secrets: [{ icon: "heart", message: "Eres mi hogar" }],
  },
  {
    type: "finale",
    title: "Y esto no termina aquí...",
    note: "Tengo algo más que decirte",
    photos: [
      { src: "/images/mami/foto-12.jpg", caption: "Te amo, Mami" },
    ],
    text: "Cierra los ojos y pasa a la última página: hay una carta esperándote.",
  },
];

// ---------- Contraportada del libro (cierre) ----------
export const bookEnd = {
  text: "Llegaste al final de nuestro libro... pero guardé lo más especial para el final.",
  button: "Abrir mi carta",
};

// ---------- Carta ----------
export const letterText = {
  intro: "Una carta para ti, hecha con todo mi amor",
  button: "Leer mi carta",
  greeting: "Querida Mami,",
  paragraphs: [
    "Hoy, en tu cumpleaños, quiero que sepas lo inmensamente importante que eres para mí. No existen palabras suficientes para agradecerte por tu apoyo incondicional y, sobre todo, por cada sacrificio que haces día a día con tanto amor por toda nuestra familia.",
    "Eres lo más preciado que tengo en la vida, mi refugio, mi mayor bendición y mi persona especial. Aun estando lejos siempre estás presente en mis pensamientos, y me llena el corazón de ilusión saber que ya muy pronto estaremos juntas de nuevo. Cami, mi papá, Ish, Nan y yo te queremos con el alma; eres el pilar que nos mantiene unidos a todos.",
    "Deseo para ti infinita salud, paz y toda la felicidad que te mereces. Espero que disfrutes muchísimo este día tan especial y que la vida te devuelva multiplicado cada momento de entrega y amor que nos regalas siempre.",
  ],
  farewell: "Con todo mi amor, hoy y siempre.",
  signature: "",
  // Foto opcional al final de la carta (déjalo en null para omitirla)
  photo: { src: "/images/mami/foto-13.jpg", caption: "Para siempre en mi corazón" },
};

// ---------- Jardín final ----------
export const gardenText = {
  title: "Feliz cumpleaños, Mami",
  message: "Gracias por ser la raíz de nuestra familia y el amor donde siempre florecemos.",
  button: "Volver a revivir nuestros recuerdos",
};
