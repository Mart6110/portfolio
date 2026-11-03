"use client";

import { useEffect, useState } from "react";
import { MenuIcon } from "lucide-react";
import Drawer from "@/components/smoothui/drawer";
import FloatingNavbar from "@/components/smoothui/floating-navbar";
import SmoothButton from "@/components/smoothui/smooth-button";
import ThemeToggle from "@/components/smoothui/theme-toggle";
import { ToggleGroupItem, ToggleGroupRoot } from "@/components/smoothui/toggle-group";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { Locale } from "@/lib/i18n/dictionary";
import { useTheme } from "@/lib/theme/ThemeContext";
import { cn } from "@/lib/utils";

const SECTION_IDS = ["expertise", "projects", "experience", "education", "contact"] as const;

// Language names are shown in their own language, whatever the current locale.
const LOCALES: { value: Locale; name: string }[] = [
  { value: "en", name: "English" },
  { value: "da", name: "Dansk" },
];

/** The section crossing the middle of the viewport, or "" while the hero is in view. */
function useActiveSection() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id === "hero" ? "" : entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    for (const id of ["hero", ...SECTION_IDS]) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return active;
}

function Brand({ compact = false }: { compact?: boolean }) {
  const { t } = useLanguage();

  return (
    <a
      aria-label={t.name}
      href="#hero"
      className="flex items-center gap-2 rounded-full font-semibold text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span aria-hidden="true" className="grid size-7 place-items-center rounded-full bg-brand font-bold font-mono text-[11px] text-on-brand">
        MM
      </span>
      {/* On narrow phones the name doesn't fit next to the controls; the monogram stays. */}
      <span className={cn("whitespace-nowrap", compact && "hidden min-[420px]:inline")}>{t.name}</span>
    </a>
  );
}

function SettingsControls() {
  const { t, locale, setLocale } = useLanguage();
  const { theme, setTheme } = useTheme();

  return (
    <>
      <ToggleGroupRoot
        aria-label={t.ui.language}
        className="rounded-full p-0.5"
        value={[locale]}
        onValueChange={(value) => {
          // A single-select group can be emptied by pressing the active item; keep the current locale then.
          const next = LOCALES.find((loc) => loc.value === value[0]);
          if (next) setLocale(next.value);
        }}
      >
        {LOCALES.map((loc) => (
          <ToggleGroupItem
            key={loc.value}
            value={loc.value}
            aria-label={loc.name}
            className="h-7 rounded-full px-2.5 font-mono text-xs"
          >
            {loc.value.toUpperCase()}
          </ToggleGroupItem>
        ))}
      </ToggleGroupRoot>
      <ThemeToggle
        className="[&_svg]:size-6"
        onThemeChange={(next) => setTheme(next === "dark" ? "dark" : "light")}
        showSystem={false}
        size="sm"
        theme={theme}
      />
    </>
  );
}

export default function SiteHeader() {
  const { t } = useLanguage();
  const activeId = useActiveSection();
  const [menuOpen, setMenuOpen] = useState(false);

  const items = SECTION_IDS.map((id) => ({ id, label: t.nav[id], href: `#${id}` }));

  return (
    <header>
      <FloatingNavbar
        actions={<SettingsControls />}
        activeId={activeId}
        className="fixed hidden lg:flex"
        items={items}
        logo={<Brand />}
      />

      <FloatingNavbar
        actions={
          <>
            <SettingsControls />
            <Drawer
              onOpenChange={setMenuOpen}
              open={menuOpen}
              side="right"
              title={t.ui.menu}
              trigger={
                <SmoothButton aria-label={t.ui.menu} shape="pill" size="icon-sm" variant="ghost">
                  <MenuIcon />
                </SmoothButton>
              }
            >
              <nav aria-label={t.ui.menu}>
                <ul className="flex flex-col">
                  {items.map((item) => (
                    <li key={item.id} className="border-border border-b last:border-b-0">
                      <a
                        aria-current={item.id === activeId ? "true" : undefined}
                        className="flex items-center justify-between py-3.5 font-medium text-base outline-none hover:text-brand-strong focus-visible:text-brand-strong aria-[current]:text-brand-strong"
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </Drawer>
          </>
        }
        activeId={activeId}
        className="fixed inset-x-3 w-auto justify-between lg:hidden"
        items={[]}
        logo={<Brand compact />}
      />
    </header>
  );
}
