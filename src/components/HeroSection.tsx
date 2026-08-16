"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { GithubIcon, LinkedinIcon, MailIcon } from "./icons";
import CodeGlobe from "./CodeGlobe";
import styles from "./HeroSection.module.css";

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section id="hero" className={styles.hero}>
      <CodeGlobe />
      <div className={styles.inner}>
        <p className={styles.greeting}>{t.hero.greeting}</p>
        <h1 className={styles.headline}>{t.role}</h1>
        <p className={styles.intro}>{t.hero.intro}</p>

        <div className={styles.ctaRow}>
          <button type="button" className={styles.primaryButton} onClick={() => scrollToSection("projects")}>
            {t.hero.ctaWork}
          </button>
          <button type="button" className={styles.secondaryButton} onClick={() => scrollToSection("contact")}>
            {t.hero.ctaContact}
          </button>
        </div>

        <ul className={styles.contactList}>
          <li>
            <a href={`mailto:${t.email}`}>
              <MailIcon size={16} /> <span>{t.email}</span>
            </a>
          </li>
          <li>
            <a href={`https://${t.github}`} target="_blank" rel="noreferrer">
              <GithubIcon size={16} /> <span>{t.github}</span>
            </a>
          </li>
          <li>
            <a href={`https://${t.linkedin}`} target="_blank" rel="noreferrer">
              <LinkedinIcon size={16} /> <span>{t.linkedin}</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
