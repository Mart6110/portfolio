export interface Project {
  slug: string;
  title: string;
  description: { en: string; da: string };
  tech: string[];
  category: "fullstack" | "frontend" | "mobile";
  repoUrl: string;
  demoUrl?: string;
}

export const projects: Project[] = [
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
    repoUrl: "https://github.com/Mart6110/frontend",
  },
  {
    slug: "notice-board-app",
    title: "Notice Board App",
    description: {
      en: "A cross-platform notice board mobile app built with Flutter, backed by a companion REST API.",
      da: "En cross-platform opslagstavle-app bygget med Flutter, understøttet af et tilhørende REST API.",
    },
    tech: ["Flutter", "Dart", "JavaScript", "REST API"],
    category: "mobile",
    repoUrl: "https://github.com/Mart6110/flutter_notice_board_app",
  },
  {
    slug: "datagrid",
    title: "Datagrid",
    description: {
      en: "An Angular project for building an interactive, sortable data grid component.",
      da: "Et Angular-projekt til at bygge en interaktiv, sorterbar datagrid-komponent.",
    },
    tech: ["Angular", "TypeScript"],
    category: "frontend",
    repoUrl: "https://github.com/Mart6110/Datagrid",
  },
];
