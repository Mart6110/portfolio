"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import sectionStyles from "./Section.module.css";
import styles from "./ExpertiseSection.module.css";

export default function ExpertiseSection() {
  const { t } = useLanguage();

  return (
    <section id="expertise" className={sectionStyles.section}>
      <div className={sectionStyles.container}>
        <div className={sectionStyles.header}>
          <span className={sectionStyles.eyebrow}>{t.nav.expertise}</span>
          <h2 className={sectionStyles.title}>{t.expertiseTitle}</h2>
        </div>

        <div className={styles.cardGrid}>
          {t.expertiseCards.map((card) => (
            <div key={card.title} className={styles.card}>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardDescription}>{card.description}</p>
            </div>
          ))}
        </div>

        <div className={styles.skillGroups}>
          {t.skillCategories.map((category) => (
            <div key={category.label} className={styles.skillGroup}>
              <span className={styles.skillLabel}>{category.label}</span>
              <div className={styles.tagRow}>
                {category.items.map((item) => (
                  <span key={item} className={styles.tag}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
