"use client";

import { ChevronDownIcon, ExternalLinkIcon, MailIcon } from "lucide-react";
import ButtonCopy from "@/components/smoothui/button-copy";
import DropdownMenu from "@/components/smoothui/dropdown-menu";
import SmoothButton from "@/components/smoothui/smooth-button";
import { useEmailReveal } from "@/lib/email";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { GithubIcon, LinkedinIcon } from "./icons";
import Reveal from "./Reveal";

// Compose pages for the two big webmail services. A bare mailto: link does nothing on a
// computer with no mail app set up, which is common for people who use webmail.
const gmailComposeUrl = (to: string) => `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}`;
const outlookComposeUrl = (to: string) =>
  `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(to)}`;

function openInNewTab(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

export default function ContactSection() {
  const { t } = useLanguage();
  // The address is only put together on a click: by the menu, the copy button or "Show email".
  const { email, linkRef, reveal, revealAndFocus } = useEmailReveal();

  const emailOptions = [
    { key: "via", label: t.contact.emailVia, groupLabel: t.contact.emailVia },
    { key: "gmail", label: "Gmail", icon: <ExternalLinkIcon />, onSelect: () => openInNewTab(gmailComposeUrl(reveal())) },
    {
      key: "outlook",
      label: "Outlook",
      icon: <ExternalLinkIcon />,
      onSelect: () => openInNewTab(outlookComposeUrl(reveal())),
    },
    {
      key: "app",
      label: t.contact.emailApp,
      icon: <MailIcon />,
      onSelect: () => {
        window.location.href = `mailto:${reveal()}`;
      },
    },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="px-4 py-20 sm:px-6 md:py-28">
      <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-border bg-card px-6 py-16 text-center shadow-sm md:px-12 md:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,color-mix(in_oklab,var(--color-brand)_18%,transparent),transparent_70%)]"
        />
        <div className="relative">
          <p aria-hidden="true" className="mb-4 flex items-center justify-center gap-3 font-mono text-brand-strong text-xs tracking-widest">
            <span className="h-px w-10 bg-brand/50" />
            05
            <span className="h-px w-10 bg-brand/50" />
          </p>
          <h2 id="contact-title" className="text-balance font-bold text-3xl tracking-tight md:text-5xl">
            {t.contact.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-balance text-lg text-muted-foreground leading-relaxed">
            {t.contact.subtitle}
          </p>

          <div className="mt-10 flex items-center justify-center gap-3">
            <DropdownMenu align="center" className="min-w-52" items={emailOptions} sideOffset={8}>
              <SmoothButton color="accent" size="lg" variant="solid">
                <MailIcon />
                {t.contact.emailCta}
                <ChevronDownIcon />
              </SmoothButton>
            </DropdownMenu>
            <ButtonCopy onCopy={() => navigator.clipboard.writeText(reveal())} />
          </div>
          <p aria-live="polite" className="mt-4 font-mono text-muted-foreground text-sm">
            {email ? (
              <a
                className="rounded-sm outline-none transition-colors hover:text-brand-strong focus-visible:ring-2 focus-visible:ring-ring"
                href={`mailto:${email}`}
                ref={linkRef}
              >
                {email}
              </a>
            ) : (
              <button
                className="cursor-pointer rounded-sm underline decoration-dotted underline-offset-4 outline-none transition-colors hover:text-brand-strong focus-visible:ring-2 focus-visible:ring-ring"
                onClick={revealAndFocus}
                type="button"
              >
                {t.contact.showEmail}
              </button>
            )}
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <SmoothButton asChild shape="pill" variant="outline">
              <a href={`https://${t.github}`} rel="noreferrer" target="_blank">
                <GithubIcon size={16} />
                GitHub
              </a>
            </SmoothButton>
            <SmoothButton asChild shape="pill" variant="outline">
              <a href={`https://${t.linkedin}`} rel="noreferrer" target="_blank">
                <LinkedinIcon size={16} />
                LinkedIn
              </a>
            </SmoothButton>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
