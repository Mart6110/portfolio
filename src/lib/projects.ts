export interface Project {
  slug: string;
  title: string;
  description: { en: string; da: string };
  tech: string[];
  category: "fullstack" | "frontend" | "ai" | "mobile";
  repoUrl: string;
  demoUrl?: string;
  /** Projects with a screenshot are also shown large in the Featured list. Files live in /public. */
  screenshot?: {
    light: string;
    dark: string;
    alt: { en: string; da: string };
  };
}

export const projects: Project[] = [
  {
    slug: "ark",
    title: "Ark",
    description: {
      en: "A word processor that runs in the browser: real A4 pages that paginate as you type, paragraph styles, tables and images, autosave to IndexedDB, .docx import and export, and PDF export.",
      da: "En tekstbehandler der kører i browseren: rigtige A4-sider der pagineres mens du skriver, afsnitstypografier, tabeller og billeder, automatisk lagring i IndexedDB, import og eksport af .docx samt PDF-eksport.",
    },
    tech: ["React", "TypeScript", "Tiptap", "Tailwind CSS", "SmoothUI", "Vite"],
    category: "frontend",
    repoUrl: "https://github.com/Mart6110/Ark",
    screenshot: {
      light: "/projects/ark-light.webp",
      dark: "/projects/ark-dark.webp",
      alt: {
        en: "Ark with its welcome document on an A4 page, the formatting toolbar above it and the documents sidebar on the left.",
        da: "Ark med velkomstdokumentet på en A4-side, formateringsværktøjslinjen over den og dokumentpanelet til venstre.",
      },
    },
  },
  {
    slug: "company-assistant",
    title: "Company Assistant",
    description: {
      en: "An internal AI assistant that answers policy questions from company documents and handles HR and IT tasks through MCP tools, always with the signed-in employee's own permissions. Layered guardrails, PII redaction, a semantic cache and an evaluation release gate.",
      da: "En intern AI-assistent der besvarer spørgsmål om politikker ud fra virksomhedens dokumenter og klarer HR- og IT-opgaver via MCP-værktøjer, altid med den indloggede medarbejders egne rettigheder. Lagdelte guardrails, PII-maskering, semantisk cache og en evalueringsbaseret release gate.",
    },
    tech: ["Python", "FastAPI", "pgvector", "Redis", "MCP", "OAuth", "Docker"],
    category: "ai",
    repoUrl: "https://github.com/Mart6110/company-assistant",
  },
  {
    slug: "dashboard-creator",
    title: "Dashboard Creator",
    description: {
      en: "Build dashboards from any JSON or CSV API: connect a data source, then lay out KPI tiles, line, bar and donut charts and tables on a drag-and-resize grid. A server-side proxy handles APIs without CORS.",
      da: "Byg dashboards fra ethvert JSON- eller CSV-API: forbind en datakilde og placer KPI-felter, linje-, søjle- og donutdiagrammer samt tabeller på et grid, hvor de kan trækkes og skaleres. En proxy på serveren håndterer API'er uden CORS.",
    },
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "SmoothUI", "Recharts", "TanStack Query"],
    category: "frontend",
    repoUrl: "https://github.com/Mart6110/dashboard-creator",
    screenshot: {
      light: "/projects/dashboard-creator-light.webp",
      dark: "/projects/dashboard-creator-dark.webp",
      alt: {
        en: "Dashboard Creator showing the sample Sales overview dashboard: four KPI tiles, a revenue and costs line chart and a revenue-by-channel donut chart.",
        da: "Dashboard Creator med eksempel-dashboardet Sales overview: fire KPI-felter, et linjediagram over omsætning og omkostninger og et donutdiagram over omsætning pr. kanal.",
      },
    },
  },
  {
    slug: "bookstore",
    title: "Online Bookstore",
    description: {
      en: "A full-stack bookstore MVP — browse and search books, cart and checkout, user auth, order history, and an admin catalog manager. Go API with a React + TypeScript frontend, containerized with Docker Compose.",
      da: "Et fullstack bogshop-MVP — gennemse og søg i bøger, kurv og checkout, brugerlogin, ordrehistorik og en admin-katalogstyring. Go-API med et React + TypeScript-frontend, kørt med Docker Compose.",
    },
    tech: ["Go", "React", "TypeScript", "PostgreSQL", "Docker"],
    category: "fullstack",
    repoUrl: "https://github.com/Mart6110/bookStore",
  },
  {
    slug: "sand-battery-dashboard",
    title: "Sand Battery Dashboard",
    description: {
      en: "A dashboard for monitoring and controlling sand battery energy storage systems — real-time KPI cards, ECharts visualizations, a dark/light theme, and Excel export.",
      da: "Et dashboard til overvågning og styring af sand-batteri-energilagringssystemer — realtids-KPI-kort, ECharts-visualiseringer, lys/mørkt tema og Excel-eksport.",
    },
    tech: ["React", "TypeScript", "Redux Toolkit", "ECharts", "Chakra UI"],
    category: "frontend",
    repoUrl: "https://github.com/Mart6110/Sand-battery-frontend",
  },
  {
    slug: "sports-app",
    title: "Sports App",
    description: {
      en: "A workout and run-tracking app: build routines and programs, log sessions, and track runs with GPS. A Go REST API with MongoDB behind a React Native (Expo) app.",
      da: "En trænings- og løbeapp: opbyg rutiner og programmer, log træningspas og følg løbeture med GPS. Et Go REST API med MongoDB bag en React Native-app (Expo).",
    },
    tech: ["Go", "MongoDB", "React Native", "Expo", "TypeScript", "Docker"],
    category: "mobile",
    repoUrl: "https://github.com/Mart6110/projects/tree/main/sports-app",
  },
];
