"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function SiteFooter() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-border border-t px-4 py-8 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 text-muted-foreground text-sm sm:flex-row">
        <p>
          © {year} {t.name}
        </p>
        <p>{t.footer.builtWith}</p>
      </div>
    </footer>
  );
}
