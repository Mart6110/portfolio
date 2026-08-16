"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { Locale } from "@/lib/i18n/dictionary";
import { useTheme } from "@/lib/theme/ThemeContext";
import { CloseIcon, MenuIcon, MoonIcon, SunIcon } from "./icons";
import styles from "./SiteHeader.module.css";

const SECTION_IDS = ["expertise", "projects", "experience", "education", "contact"] as const;

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function SiteHeader() {
  const { t, locale, setLocale } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    scrollToSection(id);
    setMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <button
          type="button"
          className={styles.brand}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setMenuOpen(false);
          }}
        >
          {t.name}
        </button>

        <nav className={styles.nav}>
          {SECTION_IDS.map((id) => (
            <button key={id} type="button" className={styles.navLink} onClick={() => handleNavClick(id)}>
              {t.nav[id]}
            </button>
          ))}
        </nav>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.iconButton}
            onClick={toggleTheme}
            aria-label="Toggle color theme"
          >
            {theme === "light" ? <MoonIcon size={18} /> : <SunIcon size={18} />}
          </button>
          <div className={styles.langToggle}>
            {(["en", "da"] as Locale[]).map((loc) => (
              <button
                key={loc}
                type="button"
                className={loc === locale ? `${styles.langButton} ${styles.langButtonActive}` : styles.langButton}
                onClick={() => setLocale(loc)}
              >
                {loc.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            type="button"
            className={styles.menuButton}
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className={styles.mobileNav}>
          {SECTION_IDS.map((id) => (
            <button key={id} type="button" className={styles.mobileNavLink} onClick={() => handleNavClick(id)}>
              {t.nav[id]}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}
