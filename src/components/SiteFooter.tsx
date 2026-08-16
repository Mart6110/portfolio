"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import styles from "./SiteFooter.module.css";

export default function SiteFooter() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <p>
        © {year} {t.name}
      </p>
    </footer>
  );
}
