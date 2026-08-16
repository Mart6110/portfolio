"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import sectionStyles from "./Section.module.css";
import timelineStyles from "./Timeline.module.css";

export default function EducationSection() {
  const { t } = useLanguage();

  return (
    <section id="education" className={sectionStyles.sectionAlt}>
      <div className={sectionStyles.container}>
        <div className={sectionStyles.header}>
          <span className={sectionStyles.eyebrow}>{t.nav.education}</span>
          <h2 className={sectionStyles.title}>{t.educationTitle}</h2>
        </div>

        <div className={timelineStyles.list}>
          {t.education.map((entry) => (
            <article key={entry.school} className={timelineStyles.item}>
              <div className={timelineStyles.itemHeader}>
                <span className={timelineStyles.itemTitle}>{entry.school}</span>
                <span className={timelineStyles.itemPeriod}>{entry.period}</span>
              </div>
              <p className={timelineStyles.itemSubtitle}>{entry.program}</p>
              <p className={timelineStyles.itemLocation}>{entry.location}</p>
              <ul className={timelineStyles.bulletList}>
                {entry.bullets.map((bullet) => (
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
