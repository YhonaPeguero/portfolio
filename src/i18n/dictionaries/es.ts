import type { Dictionary } from "./en";

/**
 * Spanish interface copy (neutral Latin American Spanish). Typed against the
 * English dictionary: add a key there and this file stops compiling until it
 * is translated here too.
 *
 * Technology, product and program names stay in their original form.
 */
export const es: Dictionary = {
  common: {
    seeLess: "Ver menos",
  },
  a11y: {
    skipToProjects: "Saltar a proyectos",
  },
  language: {
    label: "Idioma",
    names: { en: "inglés", es: "español" },
  },
  intro: {
    label: "Intro: iniciando el portafolio",
    typing: "> inicializando operador…",
    skip: "[ SALTAR ]",
  },
  nav: {
    label: "Principal",
    backToTop: "Volver arriba",
    links: {
      home: "INICIO",
      skills: "HABILIDADES",
      projects: "PROYECTOS",
      sidequests: "WEB3",
      experience: "EXPERIENCIA",
      contact: "CONTACTO",
    },
    codes: {
      home: "ARRANQUE",
      skills: "ARSENAL",
      projects: "MISIONES",
      sidequests: "SECUNDARIAS",
      experience: "ESTADÍSTICAS",
      contact: "CONEXIÓN",
    },
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    menuTitle: "[ NAVEGACIÓN ]",
    here: "● AQUÍ",
  },
  cv: {
    download: "DESCARGAR CV",
    onlyIn: (language) => `Descargar CV (disponible solo en ${language})`,
  },
  hero: {
    status: "SISTEMA EN LÍNEA // LISTO",
    enter: "ENTRAR AL PORTAFOLIO",
    findMe: "ENCUÉNTRAME",
    scrollNext: "Ir a la siguiente sección",
    figureAlt: "Yhonatan como desarrollador holográfico con capucha",
  },
  skills: {
    title: "ARSENAL TÉCNICO",
    subtitle:
      "Nodos de habilidad equipados. Las barras muestran el dominio actual: frontend al máximo, on-chain subiendo de nivel rápido.",
  },
  projects: {
    title: "REGISTRO DE MISIONES",
    subtitle:
      "Proyectos seleccionados, primero los de mayor impacto. Abre cualquier tarjeta para ver el informe completo.",
    seeMore: (count) => (count === 1 ? "Ver 1 proyecto más" : `Ver ${count} proyectos más`),
    openDetails: (name) => `Abrir detalles de ${name}`,
    screenshotOf: (name) => `Captura de pantalla de ${name}`,
    rank: (rank) => `Rango ${rank}`,
    viewIntel: "VER INFORME",
    intel: "INFORME",
    live: "DEMO",
    code: "CÓDIGO",
    missionBrief: "INFORME",
    previous: "Proyecto anterior",
    next: "Proyecto siguiente",
    close: "Cerrar detalles del proyecto",
    openLive: "ABRIR DEMO EN VIVO",
    sourceCode: "CÓDIGO FUENTE",
    achievements: "LOGROS",
    impact: "IMPACTO",
    stack: "STACK",
  },
  sideQuests: {
    title: "MISIONES SECUNDARIAS",
    subtitle:
      "Actividad en Web3 y open source: hackathones, contribuciones a DeFi y experimentos on-chain.",
    status: { COMPLETE: "COMPLETADA", ACTIVE: "ACTIVA", ONGOING: "EN CURSO" },
    view: "VER",
    seeMore: (count) => (count === 1 ? "Ver 1 misión más" : `Ver ${count} misiones más`),
  },
  experience: {
    title: "HOJA DE PERSONAJE",
    subtitle: "Roles reales, fechas reales, resultados reales: del más reciente al más antiguo.",
    current: "ACTUAL",
    readLess: "Leer menos",
    readMore: (count) => `Leer más (+${count})`,
    seeMore: (count) => (count === 1 ? "Ver 1 rol más" : `Ver ${count} roles más`),
    education: "EDUCACIÓN",
    certifications: "CERTIFICACIONES",
    languages: "IDIOMAS",
  },
  contact: {
    title: "INICIAR CONEXIÓN",
    subtitle:
      "Abierto a roles senior de ingeniería de software y Web3, colaboraciones y buenos problemas. Envía una transmisión.",
    name: "> NOMBRE:",
    replyTo: "> TU_CORREO:",
    message: "> MENSAJE:",
    namePlaceholder: "tu_nombre",
    emailPlaceholder: "tu@dominio.com",
    messagePlaceholder: "escribe tu transmisión...",
    send: "TRANSMITIR",
    email: "Correo electrónico",
    mailSubject: (name) => `[PORTAFOLIO] Nueva transmisión de ${name || "anónimo"}`,
    mailBody: (message, name, replyTo) => `${message}\n\n— ${name}\nResponder a: ${replyTo}`,
  },
  footer: {
    rights: "Todos los derechos reservados",
    top: "ARRIBA",
    backToTop: "Volver arriba",
  },
  companion: {
    dialogLabel: "PIXL: información sobre Yhonatan",
    close: "Cerrar",
    unit: "UNIDAD_GUÍA",
    online: "EN LÍNEA",
    topics: "TEMAS",
    greetingBefore: "¡Konnichiwa! Soy ",
    greetingAfter: ". Elige un tema y te cuento sobre Yhonatan 👀",
    openTitle: "Pregúntale a PIXL sobre Yhonatan",
    closeTitle: "Cerrar PIXL",
    openLabel: "Abrir PIXL: información sobre Yhonatan",
    closeLabel: "Cerrar la guía PIXL",
    restart: "Reiniciar conversación",
    logLabel: "Conversación con PIXL",
    youAsked: "Preguntaste:",
    pixlSays: "PIXL:",
    seen: "visto",
    actions: {
      skills: "VER HABILIDADES",
      projects: "VER PROYECTOS",
      sidequests: "VER WEB3",
      experience: "VER EXPERIENCIA",
      contact: "IR A CONTACTO",
      email: "ENVIAR EMAIL",
    },
  },
};
