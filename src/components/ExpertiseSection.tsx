"use client";

import { FactoryIcon, LayoutTemplateIcon, ServerIcon } from "lucide-react";
import Badge from "@/components/smoothui/badge";
import GlowHover from "@/components/smoothui/glow-hover-card";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import Reveal from "./Reveal";
import Section from "./Section";

// One per entry in `expertiseCards`, in the same order.
const CARD_ICONS = [LayoutTemplateIcon, ServerIcon, FactoryIcon];

export default function ExpertiseSection() {
  const { t } = useLanguage();

  const items = t.expertiseCards.map((card, index) => {
    const Icon = CARD_ICONS[index] ?? LayoutTemplateIcon;
    return {
      id: card.title,
      element: (
        <article className="rounded-2xl border border-border bg-card p-7 shadow-xs">
          <span className="mb-6 grid size-10 place-items-center rounded-xl bg-brand/12 text-brand-strong">
            <Icon aria-hidden="true" className="size-5" />
          </span>
          <h3 className="mb-3 font-semibold text-lg tracking-tight">{card.title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{card.description}</p>
        </article>
      ),
    };
  });

  return (
    <Section id="expertise" index="01" title={t.expertiseTitle}>
      <Reveal>
        <GlowHover className="grid gap-4 md:grid-cols-3" items={items} />
      </Reveal>

      <Reveal className="mt-14 divide-y divide-border rounded-2xl border border-border bg-card shadow-xs">
        {t.skillCategories.map((category) => (
          <div key={category.label} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-baseline sm:gap-6 md:px-7">
            <h3 className="w-28 shrink-0 font-mono text-muted-foreground text-xs uppercase tracking-widest">
              {category.label}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {category.items.map((item) => (
                <li key={item}>
                  <Badge className="h-7 px-3 text-[13px]" variant="secondary">
                    {item}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Reveal>
    </Section>
  );
}
