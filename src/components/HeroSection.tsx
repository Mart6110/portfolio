"use client";

import { Fragment } from "react";
import { ArrowRightIcon, MailIcon } from "lucide-react";
import Badge, { StatusDot } from "@/components/smoothui/badge";
import ParallaxLayers from "@/components/smoothui/parallax-layers";
import PixelFlowField from "@/components/smoothui/pixel-flow-field";
import SmoothButton from "@/components/smoothui/smooth-button";
import SoftBlurIn from "@/components/smoothui/soft-blur-in";
import { useEmailReveal } from "@/lib/email";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useTheme } from "@/lib/theme/ThemeContext";
import { cn } from "@/lib/utils";
import { GithubIcon, LinkedinIcon } from "./icons";
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

// Background glows, back to front. Deeper layers drift further as the hero scrolls away.
const PARALLAX_LAYERS = [
  {
    id: "glow-text",
    depth: 0.3,
    content: (
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_15%_20%,color-mix(in_oklab,var(--color-brand)_14%,transparent),transparent_70%)]"
      />
    ),
  },
  {
    id: "glow-field",
    depth: 0.8,
    content: (
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_78%_50%,color-mix(in_oklab,var(--color-brand)_12%,transparent),transparent_38%)]"
      />
    ),
  },
];

const FIELD_WORD = "</>";

// Ramp stops dim → bright: drifting field, word edges, word core. The field reads its colours
// only when these strings change, so each theme gets its own token names; that also lets the
// field grey be tuned per theme.
const FIELD_COLORS = {
  light: ["--color-smooth-500", "--color-brand", "--color-brand-strong"],
  dark: ["--color-smooth-700", "--color-brand", "--color-brand-light"],
};

export default function HeroSection({ ready }: { ready: boolean }) {
  const { t, locale } = useLanguage();
  const { theme } = useTheme();

  // The address isn't in the page until someone clicks "Show email" (see src/lib/email.ts).
  const { email, linkRef, revealAndFocus } = useEmailReveal();

  const contactLinks = [
    { icon: <GithubIcon size={16} />, label: t.github, href: `https://${t.github}` },
    { icon: <LinkedinIcon size={16} />, label: t.linkedin, href: `https://${t.linkedin}` },
  ];
  const contactItemClass =
    "flex items-center gap-2 rounded-sm outline-none transition-colors hover:text-brand-strong focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <section id="hero" className="relative flex min-h-dvh items-center overflow-hidden px-4 pt-28 pb-16 sm:px-6">
      <ParallaxLayers className="pointer-events-none absolute inset-0" layers={PARALLAX_LAYERS} range={140} />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6">
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
              <SmoothButton asChild color="accent" size="lg" variant="solid">
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
              <li aria-live="polite">
                {email ? (
                  <a className={contactItemClass} href={`mailto:${email}`} ref={linkRef}>
                    <MailIcon className="size-4" />
                    {email}
                  </a>
                ) : (
                  <button className={cn(contactItemClass, "cursor-pointer")} onClick={revealAndFocus} type="button">
                    <MailIcon className="size-4" />
                    {t.contact.showEmail}
                  </button>
                )}
              </li>
              {contactLinks.map((link) => (
                <li key={link.href}>
                  <a className={contactItemClass} href={link.href} rel="noreferrer" target="_blank">
                    {link.icon}
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Paused until the preloader lifts: the field assembles the first time it runs.
            On wide screens it grows into the page margin by up to 7rem, never past the viewport,
            and its height is capped so it still fits on short laptop screens. */}
        <PixelFlowField
          className="h-80 w-full [mask-image:radial-gradient(closest-side,#000_70%,transparent)] sm:h-[26rem] md:h-[30rem] lg:col-span-6 lg:aspect-square lg:h-auto lg:max-h-[calc(100dvh-11rem)] lg:w-[calc(100%_+_clamp(0px,_(100vw_-_72rem)_/_2_-_1rem,_7rem))]"
          colors={FIELD_COLORS[theme]}
          paused={!ready}
          text={FIELD_WORD}
        />
      </div>
    </section>
  );
}
