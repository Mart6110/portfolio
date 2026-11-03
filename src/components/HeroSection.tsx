"use client";

import { Fragment } from "react";
import { ArrowRightIcon, MailIcon } from "lucide-react";
import Badge, { StatusDot } from "@/components/smoothui/badge";
import ParallaxLayers from "@/components/smoothui/parallax-layers";
import SmoothButton from "@/components/smoothui/smooth-button";
import SoftBlurIn from "@/components/smoothui/soft-blur-in";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { GithubIcon, LinkedinIcon } from "./icons";
import CodeGlobe from "./CodeGlobe";
import Reveal from "./Reveal";

const HEADLINE_DELAY_MS = 150;
// SoftBlurIn's default per-character stagger.
const CHARACTER_STAGGER_MS = 25;

/**
 * SoftBlurIn makes every character an inline-block, so a line can break mid-word.
 * Animating word by word inside no-wrap spans keeps breaks between words, and
 * offsetting each word's delay keeps the stagger running across the whole line.
 */
function AnimatedHeadline({ text, ready }: { text: string; ready: boolean }) {
  const words = text.split(" ");

  return words.map((word, index) => {
    const charsBefore = words.slice(0, index).reduce((count, w) => count + w.length + 1, 0);
    return (
      <Fragment key={`${word}-${index}`}>
        {index > 0 && " "}
        <span className="inline-block whitespace-nowrap">
          {/* SoftBlurIn starts on mount, so it mounts only once the preloader lifts; until then a hidden copy holds the space. */}
          {ready ? (
            <SoftBlurIn delay={HEADLINE_DELAY_MS + charsBefore * CHARACTER_STAGGER_MS}>{word}</SoftBlurIn>
          ) : (
            <span className="invisible">{word}</span>
          )}
        </span>
      </Fragment>
    );
  });
}

// Background layers, back to front. Deeper layers drift further as the hero scrolls away.
const PARALLAX_LAYERS = [
  {
    id: "dots",
    depth: 0.15,
    content: (
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_70%_60%_at_30%_40%,#000,transparent_75%)]"
      />
    ),
  },
  {
    id: "glow",
    depth: 0.45,
    content: (
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_15%_20%,color-mix(in_oklab,var(--color-brand)_14%,transparent),transparent_70%),radial-gradient(circle_at_85%_45%,color-mix(in_oklab,var(--color-brand)_10%,transparent),transparent_40%)]"
      />
    ),
  },
  {
    id: "globe",
    depth: 1,
    content: <CodeGlobe className="lg:[mask-image:linear-gradient(to_right,transparent_38%,#000_62%)]" />,
  },
];

export default function HeroSection({ ready }: { ready: boolean }) {
  const { t, locale } = useLanguage();

  const contactLinks = [
    { icon: <MailIcon className="size-4" />, label: t.email, href: `mailto:${t.email}`, external: false },
    { icon: <GithubIcon size={16} />, label: t.github, href: `https://${t.github}`, external: true },
    { icon: <LinkedinIcon size={16} />, label: t.linkedin, href: `https://${t.linkedin}`, external: true },
  ];

  return (
    <section id="hero" className="relative flex min-h-dvh items-center overflow-hidden px-4 pt-28 pb-16 sm:px-6">
      <ParallaxLayers className="pointer-events-none absolute inset-0" layers={PARALLAX_LAYERS} range={140} />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <Reveal ready={ready}>
          <Badge className="mb-8 h-7 gap-2 bg-background/70 px-3 backdrop-blur-sm" variant="outline">
            <StatusDot pulse size="sm" status="online" />
            {t.hero.status}
          </Badge>
          <p className="mb-3 font-medium text-brand-strong text-lg">{t.hero.greeting}</p>
        </Reveal>

        <h1 className="max-w-4xl font-extrabold text-[2.5rem] leading-[1.05] tracking-tight min-[400px]:text-5xl sm:text-6xl lg:text-7xl">
          <span className="sr-only">{t.role}</span>
          <span aria-hidden="true">
            <AnimatedHeadline key={locale} ready={ready} text={t.role} />
          </span>
        </h1>

        <Reveal delay={0.25} ready={ready}>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">{t.hero.intro}</p>

          <div className="mt-10 flex flex-wrap gap-3">
            <SmoothButton asChild size="lg" variant="candy">
              <a href="#projects">
                {t.hero.ctaWork}
                <ArrowRightIcon />
              </a>
            </SmoothButton>
            <SmoothButton asChild size="lg" variant="outline">
              <a href="#contact">{t.hero.ctaContact}</a>
            </SmoothButton>
          </div>

          <ul className="mt-12 flex flex-wrap gap-x-7 gap-y-3 text-muted-foreground text-sm">
            {contactLinks.map((link) => (
              <li key={link.href}>
                <a
                  className="flex items-center gap-2 rounded-sm outline-none transition-colors hover:text-brand-strong focus-visible:ring-2 focus-visible:ring-ring"
                  href={link.href}
                  rel={link.external ? "noreferrer" : undefined}
                  target={link.external ? "_blank" : undefined}
                >
                  {link.icon}
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
