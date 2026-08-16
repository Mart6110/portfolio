"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import sectionStyles from "./Section.module.css";
import timelineStyles from "./Timeline.module.css";

export default function ExperienceSection() {
  const { t } = useLanguage();

  return (
    <section id="experience" className={sectionStyles.section}>
      <div className={sectionStyles.container}>
        <div className={sectionStyles.header}>
          <span className={sectionStyles.eyebrow}>{t.nav.experience}</span>
          <h2 className={sectionStyles.title}>{t.experienceTitle}</h2>
        </div>

        <div className={timelineStyles.list}>
          {t.jobs.map((job) => (
            <article key={job.company} className={timelineStyles.item}>
              <div className={timelineStyles.itemHeader}>
                <span className={timelineStyles.itemTitle}>{job.company}</span>
                <span className={timelineStyles.itemPeriod}>{job.period}</span>
              </div>
              <p className={timelineStyles.itemSubtitle}>{job.role}</p>
              <p className={timelineStyles.itemLocation}>{job.location}</p>
              <ul className={timelineStyles.bulletList}>
                {job.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
