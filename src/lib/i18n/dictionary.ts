export type Locale = "en" | "da";

export interface SkillCategory {
  label: string;
  items: string[];
}

export interface Job {
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
}

export interface Education {
  school: string;
  program: string;
  period: string;
  location: string;
  bullets: string[];
}

export interface ExpertiseCard {
  title: string;
  description: string;
}

export interface Dictionary {
  meta: {
    title: string;
    description: string;
  };
  name: string;
  role: string;
  github: string;
  linkedin: string;
  nav: {
    expertise: string;
    projects: string;
    experience: string;
    education: string;
    contact: string;
  };
  hero: {
    status: string;
    greeting: string;
    intro: string;
    ctaWork: string;
    ctaContact: string;
  };
  expertiseTitle: string;
  expertiseCards: ExpertiseCard[];
  skillsTitle: string;
  skillCategories: SkillCategory[];
  projectsTitle: string;
  projectsSubtitle: string;
  projectsFeatured: string;
  projectInDevelopment: string;
  projectsAll: string;
  projectFilters: {
    all: string;
    fullstack: string;
    frontend: string;
    ai: string;
    mobile: string;
  };
  projectLinks: {
    code: string;
    demo: string;
    /** Labels for the two code links of a project with separate frontend and API repositories. */
    frontend: string;
    api: string;
  };
  experienceTitle: string;
  jobs: Job[];
  educationTitle: string;
  education: Education[];
  contact: {
    title: string;
    subtitle: string;
    emailCta: string;
    emailVia: string;
    emailApp: string;
    /** Button that reveals the address, which isn't in the page until clicked (src/lib/email.ts). */
    showEmail: string;
  };
  ui: {
    menu: string;
    language: string;
    theme: string;
  };
  footer: {
    builtWith: string;
  };
}

const en: Dictionary = {
  meta: {
    title: "Martinus Mortensen — Software Developer",
    description:
      "Portfolio and CV of Martinus Mortensen, full-stack software developer based in Ringsted, Denmark.",
  },
  name: "Martinus Mortensen",
  role: "Software Developer",
  github: "github.com/Mart6110",
  linkedin: "linkedin.com/in/martinus-mortensen",
  nav: {
    expertise: "Expertise",
    projects: "Projects",
    experience: "Experience",
    education: "Education",
    contact: "Contact",
  },
  hero: {
    status: "Open to new opportunities",
    greeting: "Hi, I'm Martinus",
    intro:
      "A full-stack software developer based in Ringsted, Denmark, building web and industrial IoT applications with React, Go, and PostgreSQL.",
    ctaWork: "View my work",
    ctaContact: "Get in touch",
  },
  expertiseTitle: "Expertise",
  expertiseCards: [
    {
      title: "Frontend Development",
      description:
        "Building responsive, accessible interfaces with React, Angular, and TypeScript, using Redux Toolkit and modern component libraries.",
    },
    {
      title: "Backend & Databases",
      description:
        "Designing APIs and data models with Go and C#, backed by PostgreSQL and MySQL, with a focus on clean structure and reliability.",
    },
    {
      title: "Industrial IoT Platforms",
      description:
        "Building dashboards and widgets for real-time collection and visualization of machine data on Inuatek's Data Collection Cloud.",
    },
  ],
  skillsTitle: "Skills",
  skillCategories: [
    {
      label: "Frontend",
      items: [
        "React",
        "Angular",
        "Redux Toolkit",
        "JavaScript",
        "TypeScript",
        "HTML",
        "CSS (SCSS)",
        "CapacitorJS",
        "Flutter",
        "AntD",
        "Chakra UI",
        "Vitest",
      ],
    },
    { label: "Backend", items: ["Go (Golang)", "C#", "Python"] },
    { label: "Databases", items: ["PostgreSQL", "MySQL"] },
    { label: "Tools", items: ["Git", "GitHub"] },
    {
      label: "Other",
      items: ["UI/UX design", "Systems understanding", "Full-stack development"],
    },
  ],
  projectsTitle: "Projects",
  projectsSubtitle:
    "Recent things I've built, from a browser word processor and an AI assistant to dashboards and an app for splitting expenses.",
  projectsFeatured: "Featured",
  projectInDevelopment: "In development",
  projectsAll: "All projects",
  projectFilters: {
    all: "All",
    fullstack: "Full-Stack",
    frontend: "Frontend",
    ai: "AI",
    mobile: "Mobile",
  },
  projectLinks: {
    code: "Code",
    demo: "Live demo",
    frontend: "Frontend",
    api: "API",
  },
  experienceTitle: "Experience",
  jobs: [
    {
      company: "Inuatek A/S",
      role: "Software Developer",
      period: "May 2022 – June 2026",
      location: "Diplomvej 381, 2800 Kongens Lyngby",
      bullets: [
        "Developed full-stack solutions using React, Go, and PostgreSQL",
        "Contributed to the design and further development of Data Collection Cloud (DCC), Inuatek's industrial IoT platform for real-time collection and visualization of machine data for OEMs and factory owners",
        "Built dashboards, widgets, and user interfaces for complex systems",
        "Worked with complex data structures and user flows",
        "Implemented new features with a focus on usability and structure",
        "Used Git for version control and team collaboration",
      ],
    },
    {
      company: "Skanlog A/S",
      role: "Sales Consultant",
      period: "August 2016 – September 2017",
      location: "Smedeland 22, 2600 Albertslund",
      bullets: [
        "Sales and customer advisory",
        "Identified customer needs and provided tailored solutions",
        "Gained experience in communication and customer service",
      ],
    },
  ],
  educationTitle: "Education",
  education: [
    {
      school: "ZBC – Zealand Business College",
      program: "Data Technician, Specialized in Programming",
      period: "August 2021 – May 2026",
      location: "Ahorn Alle 5, 4100 Ringsted",
      bullets: [
        "Built native apps in Flutter, desktop GUIs in WPF, and web solutions in ASP.NET and Blazor, with accompanying database programming",
        "Built and tested frontend in Angular (client-side) and backend (server-side), including object-oriented programming and programming methodology",
        "Set up and administered servers and networks, including server technology, server administration and security, and Linux for server and embedded use",
        "Worked hands-on with IoT and embedded systems, as well as Big Data models and a machine learning project in Python",
        "Ran systems development projects from requirements specification through testing and security, with a focus on project management and process improvement",
        "Completed the program with an independent final examination project in programming",
      ],
    },
    {
      school: "Zealand – Academy of Technologies and Business",
      program: "Multimedia Designer",
      period: "September 2017 – June 2019",
      location: "Lyngvej 21, 4600 Køge",
      bullets: [
        "Focus on UI/UX design and frontend development",
        "Developed a strong understanding of user experience and digital solutions",
      ],
    },
  ],
  contact: {
    title: "Let's get in touch",
    subtitle: "Open to new opportunities and interesting projects — feel free to reach out.",
    emailCta: "Send me an email",
    emailVia: "Write with",
    emailApp: "Your mail app",
    showEmail: "Show email",
  },
  ui: {
    menu: "Menu",
    language: "Language",
    theme: "Theme",
  },
  footer: {
    builtWith: "Built with Next.js and SmoothUI",
  },
};

const da: Dictionary = {
  meta: {
    title: "Martinus Mortensen — Softwareudvikler",
    description:
      "Portfolio og CV for Martinus Mortensen, fullstack-softwareudvikler baseret i Ringsted.",
  },
  name: "Martinus Mortensen",
  role: "Softwareudvikler",
  github: "github.com/Mart6110",
  linkedin: "linkedin.com/in/martinus-mortensen",
  nav: {
    expertise: "Kompetencer",
    projects: "Projekter",
    experience: "Erfaring",
    education: "Uddannelse",
    contact: "Kontakt",
  },
  hero: {
    status: "Åben for nye muligheder",
    greeting: "Hej, jeg er Martinus",
    intro:
      "Fullstack-softwareudvikler baseret i Ringsted, der bygger web- og industrielle IoT-løsninger med React, Go og PostgreSQL.",
    ctaWork: "Se mit arbejde",
    ctaContact: "Kontakt mig",
  },
  expertiseTitle: "Kompetencer",
  expertiseCards: [
    {
      title: "Frontend-udvikling",
      description:
        "Bygger responsive, tilgængelige brugergrænseflader med React, Angular og TypeScript ved brug af Redux Toolkit og moderne komponentbiblioteker.",
    },
    {
      title: "Backend & databaser",
      description:
        "Designer API'er og datamodeller med Go og C#, understøttet af PostgreSQL og MySQL, med fokus på ren struktur og driftssikkerhed.",
    },
    {
      title: "Industrielle IoT-platforme",
      description:
        "Bygger dashboards og widgets til realtidsindsamling og -visualisering af maskindata på Inuateks Data Collection Cloud.",
    },
  ],
  skillsTitle: "Kompetencer",
  skillCategories: [
    {
      label: "Frontend",
      items: [
        "React",
        "Angular",
        "Redux Toolkit",
        "JavaScript",
        "TypeScript",
        "HTML",
        "CSS (SCSS)",
        "CapacitorJS",
        "Flutter",
        "AntD",
        "Chakra UI",
        "Vitest",
      ],
    },
    { label: "Backend", items: ["Go (Golang)", "C#", "Python"] },
    { label: "Databaser", items: ["PostgreSQL", "MySQL"] },
    { label: "Værktøjer", items: ["Git", "GitHub"] },
    {
      label: "Andet",
      items: ["UI/UX-design", "Systemforståelse", "Fullstack-udvikling"],
    },
  ],
  projectsTitle: "Projekter",
  projectsSubtitle:
    "Nyere ting jeg har bygget — fra en tekstbehandler i browseren og en AI-assistent til dashboards og en app til at dele udgifter.",
  projectsFeatured: "Udvalgte",
  projectInDevelopment: "Under udvikling",
  projectsAll: "Alle projekter",
  projectFilters: {
    all: "Alle",
    fullstack: "Fullstack",
    frontend: "Frontend",
    ai: "AI",
    mobile: "Mobil",
  },
  projectLinks: {
    code: "Kode",
    demo: "Live demo",
    frontend: "Frontend",
    api: "API",
  },
  experienceTitle: "Erfaring",
  jobs: [
    {
      company: "Inuatek A/S",
      role: "Softwareudvikler",
      period: "Maj 2022 – Juni 2026",
      location: "Diplomvej 381, 2800 Kongens Lyngby",
      bullets: [
        "Udviklet fullstack-løsninger med React, Go og PostgreSQL",
        "Bidraget til design og videreudvikling af Data Collection Cloud (DCC), Inuateks industrielle IoT-platform til realtidsindsamling og -visualisering af maskindata for OEM'er og fabriksejere",
        "Bygget dashboards, widgets og brugergrænseflader til komplekse systemer",
        "Arbejdet med komplekse datastrukturer og brugerflows",
        "Implementeret nye features med fokus på brugervenlighed og struktur",
        "Anvendt Git til versionsstyring og teamsamarbejde",
      ],
    },
    {
      company: "Skanlog A/S",
      role: "Salgskonsulent",
      period: "August 2016 – September 2017",
      location: "Smedeland 22, 2600 Albertslund",
      bullets: [
        "Salg og kunderådgivning",
        "Afdækket kundebehov og leveret skræddersyede løsninger",
        "Opnået erfaring med kommunikation og kundeservice",
      ],
    },
  ],
  educationTitle: "Uddannelse",
  education: [
    {
      school: "ZBC – Zealand Business College",
      program: "Datatekniker med speciale i programmering",
      period: "August 2021 – Maj 2026",
      location: "Ahorn Alle 5, 4100 Ringsted",
      bullets: [
        "Udviklet native apps i Flutter samt skrivebords-GUI'er i WPF og webløsninger i ASP.NET og Blazor, med tilhørende databaseprogrammering",
        "Bygget og testet frontend i Angular (clientside) og backend (serverside), herunder objektorienteret programmering og programmeringsmetodik",
        "Opsat og administreret servere og netværk, herunder serverteknologi, serveradministration og sikkerhed samt Linux til server- og embedded-formål",
        "Arbejdet praktisk med IoT og embeddede systemer samt Big Data-modeller og et Machine Learning-projekt i Python",
        "Gennemført systemudviklingsprojekter fra kravspecifikation til test og sikkerhed, med fokus på projektstyring og procesforbedring",
        "Afsluttet uddannelsen med et selvstændigt eksamensprojekt inden for programmering",
      ],
    },
    {
      school: "Zealand – Academy of Technologies and Business",
      program: "Multimediedesigner",
      period: "September 2017 – Juni 2019",
      location: "Lyngvej 21, 4600 Køge",
      bullets: [
        "Fokus på UI/UX-design og frontend-udvikling",
        "Opnået solid forståelse for brugeroplevelse og digitale løsninger",
      ],
    },
  ],
  contact: {
    title: "Lad os komme i kontakt",
    subtitle: "Åben for nye muligheder og spændende projekter — skriv endelig til mig.",
    emailCta: "Send mig en mail",
    emailVia: "Skriv med",
    emailApp: "Dit mailprogram",
    showEmail: "Vis e-mail",
  },
  ui: {
    menu: "Menu",
    language: "Sprog",
    theme: "Tema",
  },
  footer: {
    builtWith: "Bygget med Next.js og SmoothUI",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { en, da };
