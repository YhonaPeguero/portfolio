import { profile } from "../../data/profile";
import type { ContentOverlay } from "./types";

/**
 * Spanish text for the data in src/data (neutral Latin American Spanish).
 *
 * This is a translation, not a rewrite: every claim, number and date mirrors
 * the English source. Technology, product, program and certificate names are
 * left in their original form.
 */
export const es: ContentOverlay = {
  profile: {
    roles: ["Ingeniero de Software Senior", "Builder Web3", "Contribuidor DeFi"],
    tagline:
      "Construyo productos web de nueva generación en la intersección de UX, rendimiento y on-chain.",
    location: "Santo Domingo, República Dominicana",
  },

  skillCategories: {
    frontend: { title: "NÚCLEO FRONTEND", subtitle: "Clase principal · nivel máximo" },
    web3: { title: "STACK WEB3", subtitle: "Clase secundaria · on-chain" },
    backend: { title: "BACKEND E INFRA", subtitle: "Clase de soporte · lleva a producción" },
    grinding: { title: "EN ENTRENAMIENTO", subtitle: "En progreso · XP en aumento" },
  },

  projects: {
    "M-01": {
      classTag: "FUNDADOR · SOLANA",
      brief:
        "Incubado por WayLearn × Solana Foundation: escrow que convierte el trabajo pagado en reputación on-chain.",
      achievements: [
        "El cliente deposita los fondos en un vault propiedad del programa; la liberación, el reembolso y la disputa los ejecuta una máquina de 7 estados on-chain.",
        "Los trabajos liquidados se pueden atestar mediante el Solana Attestation Service: el historial pertenece a la wallet.",
        "15 pruebas de integración con LiteSVM (intercambio de roles, transiciones inválidas, sustitución de vault) y un cliente generado con Codama.",
      ],
      impact:
        "MVP construido por su fundador y activo en la devnet de Solana: los trabajos precargados se pueden explorar sin conectar una wallet.",
    },
    "M-02": {
      classTag: "COMUNIDAD · IA",
      brief:
        "Hub de onboarding para la comunidad del DEX de perpetuos StandX, con un guía de IA basado en la documentación oficial.",
      achievements: [
        "Reconstrucción en Next.js de un hub gestionado por la comunidad: siete secciones, del onboarding al brand kit, en seis idiomas.",
        "Stander, el guía de IA, lee la documentación oficial, enlaza la página de origen y navega por el hub cuando se le pide. Sin login.",
        "Cadena de LLM en planes gratuitos (Gemini, Mistral, Groq, OpenRouter) que, al alcanzar los límites de uso, recurre a una base de conocimiento offline.",
      ],
      impact: "Proyecto comunitario independiente, gratuito y sin login.",
    },
    "M-03": {
      classTag: "DEFI · EDUCACIÓN",
      brief:
        "Guía interactiva de las propuestas de mejora (SIP) del DEX StandX, con un simulador de rendimiento en vivo.",
      achievements: [
        "Simulador de rendimiento, recorrido paso a paso del yield loop y una sección de Community Vaults (SIP-5B), en cinco idiomas.",
        "Las rutas con hash incluyen idioma y sección, así que cualquier vista se puede compartir con un enlace directo desde un despliegue estático.",
        "CI con GitHub Actions en cada PR: lint, build, cobertura de i18n y verificación de los cálculos del simulador.",
      ],
      impact: "Compartido por el equipo de StandX en su Discord oficial, con crédito al autor.",
    },
    "M-04": {
      classTag: "DEFI · ANALÍTICA",
      brief:
        "Convierte una exportación de trades de perpetuos de StandX en un dashboard de rendimiento, procesada por completo en el navegador.",
      achievements: [
        "Calcula PnL realizado, win rate, profit factor, comisiones y resultados por mercado a partir de las exportaciones de trades y órdenes sin procesar.",
        "Privado por diseño: los archivos se procesan localmente, sin login y sin enviar nada a un servidor.",
        "Genera una tarjeta de estadísticas para compartir e incluye datos de ejemplo para probarlo sin cuenta. En inglés y español.",
      ],
      impact:
        "Herramienta comunitaria gratuita: los traders revisan su propio rendimiento sin entregar su historial a terceros.",
    },
    "M-05": {
      classTag: "EDU · JUEGO",
      brief:
        "RPG narrativo para navegador que enseña a los recién llegados cómo subir de rango en la comunidad del DEX StandX.",
      achievements: [
        '"Episode I: Origin": seis zonas de historia con diálogos, quizzes y minijuegos, además de misiones diarias, semanales y comunitarias.',
        "Local-first: estado del juego en Zustand + localStorage y contenido validado con Zod, sin backend. Cinco idiomas.",
        "Sistemas principales (puntos, rangos, barreras de progreso, rachas, misiones) cubiertos con pruebas unitarias en Vitest.",
      ],
      impact:
        "Convierte el camino de New Stander a Seed, Sprout y Flower en algo que se juega en lugar de leerse.",
    },
    "M-06": {
      classTag: "JUEGO · THREE.JS",
      brief:
        "Juego de carreras de lanchas para navegador, con estética cel-shaded y temática StandX, extendido a partir del proyecto open source Wave-Racer.",
      achievements: [
        "Extiende la base open source de Wave-Racer (Three.js) con la identidad de StandX y una mascota como piloto.",
        "Añade un sistema de nitro que se recarga con derrapes, rebufo y aterrizajes limpios, sobre el loop de carrera original.",
        "Menú de pausa con ajustes de audio, controles y gráficos.",
      ],
      impact: "Un juego comunitario que corre en el navegador, sin instalación ni login.",
    },
  },

  sideQuests: {
    repulink: {
      org: "Solana · Reputación",
      description:
        "Experimento de reputación on-chain en Solana: exploración de identidad verificable y primitivas de confianza en Web3.",
    },
    "binance-angel": {
      description:
        "Rol en la comunidad técnica de Web3: diseñé contenido educativo para builders y ayudé a los recién llegados a usar el ecosistema cripto de forma responsable.",
    },
    "base-latam-ambassador": {
      title: "Embajador de Base LATAM",
      description:
        "Creé contenido técnico y educativo para impulsar la adopción de Web3 en LATAM: onboarding onchain accesible y práctico para la comunidad de Base.",
    },
    "hack-latam-2026": {
      org: "Hackathon · Tecnología cívica",
      description:
        "Construí K-milla para el track de Transparencia y Corrupción: el gasto en salud pública hecho comprensible con IA fundamentada en fuentes.",
    },
    "standx-contributions": {
      title: "Contribuciones a la comunidad de StandX",
      description:
        "Construí y publiqué la StandX SIP Guide para ayudar a la comunidad a entender el proceso de gobernanza del protocolo.",
    },
  },

  experience: {
    "claro-rd": {
      role: "Desarrollador de Software",
      period: "Ene 2023 — Presente",
      location: "República Dominicana",
      summary:
        "Construyo front-ends escalables y centrados en el usuario en una de las empresas de telecomunicaciones más grandes del Caribe: sistemas de diseño reutilizables en React/Angular y microservicios resilientes en Java.",
      highlights: [
        "Reduje en un 20% las incidencias reportadas por usuarios y aumenté un 10% su satisfacción mediante mejoras en el front-end con React.",
        "Lideré una librería de componentes reutilizables en Angular/React que redujo el tiempo de desarrollo en un 30%; reconocida con un premio a la innovación.",
        "Reduje los tiempos de carga de página en un 40% con JS/CSS moderno y layouts responsivos para múltiples dispositivos.",
        "Construí y reforcé microservicios en Java, mejorando la eficiencia de los procesos y la estabilidad de las aplicaciones.",
      ],
    },
    blackcode: {
      role: "Desarrollador Web Frontend",
      location: "México · Remoto",
      summary:
        "Equipo de una startup en etapa temprana que entregaba productos de principio a fin: desarrollo de aplicaciones, diseño de interfaces y QA funcional a lo largo del ciclo de desarrollo.",
      highlights: [
        "Entregué funcionalidades e interfaces para una startup en etapa temprana, iterando rápido sobre problemas reales de producto.",
        "Realicé pruebas funcionales (QA) para mantener altas la calidad y la estabilidad del producto.",
        "Trabajé en todo el ciclo de desarrollo con un enfoque práctico e iterativo.",
      ],
    },
    openbootcamp: {
      role: "Desarrollador Full Stack",
      period: "Ago 2022 — May 2023",
      location: "España · Remoto",
      type: "Comunidad · Full Stack",
      summary:
        "Colaboré en la iniciativa Open-Week-Apps, construyendo pequeñas aplicaciones full stack en sprints de 7 días en equipo con otros desarrolladores.",
      highlights: [
        "Entregué aplicaciones full stack en sprints de equipo con tiempo acotado (p. ej., Anime Songs App, Quiz-Interview).",
        "Practiqué flujos de trabajo reales en equipo: planificar, construir y entregar con fecha límite.",
      ],
    },
    boyants: {
      role: "Desarrollador Full Stack",
      period: "Jun — Dic 2022",
      location: "Remoto",
      type: "Full Stack",
      summary:
        "Modernicé sistemas legacy y entregué aplicaciones robustas de principio a fin, desde servicios RESTful hasta interfaces pulidas en React.",
      highlights: [
        "Lideré la migración de sistemas legacy hacia arquitecturas modernas y mantenibles (SPA y PWA).",
        "Coordiné el desarrollo completo de aplicaciones con servicios RESTful que mejoraron la interacción del lado del cliente.",
        "Elevé la calidad del código con pruebas unitarias y de integración (Jest, Cypress) a lo largo de sprints ágiles.",
      ],
    },
    "oracle-one": {
      role: "Bootcamp de Desarrollo Web (ONE)",
      location: "Remoto",
      type: "Programa · Full Stack",
      summary:
        "Programa intensivo de desarrollo web basado en proyectos, que simula un entorno de trabajo real con aprendizaje colaborativo y autogestionado.",
      highlights: [
        "Rutas de front-end y back-end con JavaScript, React y Java.",
        "Aprendizaje basado en proyectos mediante trabajo colaborativo en equipo.",
      ],
    },
    bamapit: {
      role: "Analista Front-End (Pasante)",
      period: "Ene 2021 — Ene 2022",
      location: "República Dominicana",
      type: "Pasantía · Front-End",
      summary:
        "Pasantía de front-end que abarcó análisis de requerimientos, depuración y la conversión de conceptos de diseño en prototipos y código para web y móvil.",
      highlights: [
        "Creé prototipos en Adobe XD y Figma y los convertí en interfaces con HTML/CSS/JavaScript.",
        "Investigué y propuse mejoras de UI/UX para interfaces web y móviles.",
      ],
    },
  },

  infoTopics: {
    who: {
      label: "¿Quién es Yhonatan?",
      question: "¿Quién es Yhonatan?",
      answer:
        "Yhonatan Peguero es un Ingeniero de Software Senior radicado en República Dominicana, con más de 5 años construyendo aplicaciones web orientadas a producto. Trabaja en la intersección de UX, rendimiento y arquitectura, y además es builder en Web3 y contribuidor en DeFi.",
    },
    stack: {
      label: "Stack técnico",
      question: "¿Con qué construye?",
      answer:
        "Frontend: React, Next.js, TypeScript, Tailwind, Framer Motion y Three.js. Web3: Solana/Rust, EVM/Base, viem/wagmi. Backend e infra: Node.js, PostgreSQL, Vercel/Edge e integración de IA/LLM.",
    },
    experience: {
      label: "Experiencia",
      question: "¿Dónde ha trabajado?",
      answer:
        "Desarrollador de Software en Claro RD desde 2023 (Ingeniero de Software Sr., más de 5 años): lideró una librería reutilizable en React/Angular (premio a la innovación) y redujo un 20% las incidencias reportadas por usuarios y un 40% los tiempos de carga. Roles anteriores: BlackCode, OpenBootcamp, Boyants, Oracle ONE y una pasantía en Bamapit. En Web3 ha sido Embajador de Base LATAM (Coinbase) y Binance Angel.",
    },
    web3: {
      label: "Web3 y DeFi",
      question: "¿Cuál es su trabajo en Web3?",
      answer:
        "Construye y contribuye en DeFi: la StandX SIP Guide, K-milla (Hack@LATAM 2026) y RepuLink, un experimento de reputación on-chain en Solana. También ha sido Embajador de Base LATAM (Coinbase) y Binance Angel, creando contenido educativo para impulsar la adopción de Web3 en LATAM.",
    },
    projects: {
      label: "Proyectos destacados",
      question: "¿Qué debería ver primero?",
      answer:
        "Empieza por el Registro de Misiones: RepuLink (escrow y reputación on-chain en Solana), el StandX Community Hub (onboarding con un guía de IA basado en la documentación) y la StandX SIP Guide (simulador de rendimiento interactivo). Abre cualquier tarjeta para ver sus logros e impacto.",
    },
    contact: {
      label: "Cómo contactarlo",
      question: "¿Cómo me pongo en contacto?",
      answer: `Está abierto a roles senior de ingeniería de software y Web3, y a colaboraciones. Escríbele a ${profile.email} o ve al sector de CONTACTO para enviar una transmisión y encontrar sus redes.`,
    },
  },

  labels: {
    // Skills
    "DeFi protocols": "Protocolos DeFi",
    "Smart-contract integration": "Integración de smart contracts",
    "CI/CD & Git": "CI/CD y Git",
    "AI / LLM integration": "Integración de IA / LLM",
    "Anchor (Solana programs)": "Anchor (programas de Solana)",
    "AI agent frameworks": "Frameworks de agentes de IA",
    "Rust (systems)": "Rust (sistemas)",
    // Education
    "B.S. Software Engineering": "Ingeniería de Software (B.S.)",
    "Web Developer — ONE": "Desarrollador Web (ONE)",
    "English · Pre-Intermediate": "Inglés · Preintermedio",
    // Spoken languages
    Spanish: "Español",
    English: "Inglés",
  },
};
