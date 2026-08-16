"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { GithubIcon, LinkedinIcon, MailIcon } from "./icons";
import sectionStyles from "./Section.module.css";
import styles from "./ContactSection.module.css";

export default function ContactSection() {
  const { t } = useLanguage();

  const links = [
    { icon: <MailIcon size={18} />, label: t.email, href: `mailto:${t.email}`, external: false },
    { icon: <GithubIcon size={18} />, label: t.github, href: `https://${t.github}`, external: true },
    { icon: <LinkedinIcon size={18} />, label: t.linkedin, href: `https://${t.linkedin}`, external: true },
  ];

  return (
    <section id="contact" className={sectionStyles.section}>
      <div className={sectionStyles.container}>
        <div className={styles.panel}>
          <h2 className={styles.title}>{t.contact.title}</h2>
          <p className={styles.subtitle}>{t.contact.subtitle}</p>

          <div className={styles.linkGrid}>
            {links.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
                className={styles.linkCard}
              >
                {item.icon}
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
