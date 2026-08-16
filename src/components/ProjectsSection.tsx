"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { projects, type Project } from "@/lib/projects";
import { ArrowUpRightIcon, GithubIcon } from "./icons";
import sectionStyles from "./Section.module.css";
import styles from "./ProjectsSection.module.css";

type Filter = "all" | Project["category"];

export default function ProjectsSection() {
  const { t, locale } = useLanguage();
  const [filter, setFilter] = useState<Filter>("all");

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: t.projectFilters.all },
    { key: "fullstack", label: t.projectFilters.fullstack },
    { key: "frontend", label: t.projectFilters.frontend },
    { key: "mobile", label: t.projectFilters.mobile },
  ];

  const visibleProjects = projects.filter((project) => filter === "all" || project.category === filter);

  return (
    <section id="projects" className={sectionStyles.sectionAlt}>
      <div className={sectionStyles.container}>
        <div className={sectionStyles.header}>
          <span className={sectionStyles.eyebrow}>{t.nav.projects}</span>
          <h2 className={sectionStyles.title}>{t.projectsTitle}</h2>
          <p className={sectionStyles.subtitle}>{t.projectsSubtitle}</p>
        </div>

        <div className={styles.filterRow}>
          {filters.map((f) => (
            <button
              key={f.key}
              type="button"
              className={f.key === filter ? `${styles.filterButton} ${styles.filterButtonActive}` : styles.filterButton}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {visibleProjects.map((project) => (
            <article key={project.slug} className={styles.card}>
              <h3 className={styles.cardTitle}>{project.title}</h3>
              <p className={styles.cardDescription}>{project.description[locale]}</p>
              <div className={styles.tagRow}>
                {project.tech.map((tech) => (
                  <span key={tech} className={styles.tag}>
                    {tech}
                  </span>
                ))}
              </div>
              <div className={styles.linkRow}>
                <a href={project.repoUrl} target="_blank" rel="noreferrer" className={styles.link}>
                  <GithubIcon size={16} /> {t.projectLinks.code}
                </a>
                {project.demoUrl && (
                  <a href={project.demoUrl} target="_blank" rel="noreferrer" className={styles.link}>
                    <ArrowUpRightIcon size={16} /> {t.projectLinks.demo}
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
