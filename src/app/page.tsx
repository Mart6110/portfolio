"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import PagePreloader from "@/components/smoothui/page-preloader";
import ScrollProgress from "@/components/smoothui/scroll-progress";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import CustomCursor from "@/components/CustomCursor";
import SiteHeader from "@/components/SiteHeader";
import HeroSection from "@/components/HeroSection";
import ExpertiseSection from "@/components/ExpertiseSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import ContactSection from "@/components/ContactSection";
import SiteFooter from "@/components/SiteFooter";

const PRELOADER_WORDS = ["Hello", "Hej", "Hola", "Bonjour"];
// The words variant rolls to the next word every 480 ms; this shows each one once.
const PRELOADER_HOLD_MS = 1800;

export default function Home() {
  const shouldReduceMotion = useReducedMotion();
  const [loading, setLoading] = useState(true);

  // Controlled rather than self-timed, so the hero knows the moment the panel starts to lift.
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), shouldReduceMotion ? 0 : PRELOADER_HOLD_MS);
    return () => clearTimeout(timer);
  }, [shouldReduceMotion]);

  return (
    <LanguageProvider>
      <PagePreloader
        active={loading}
        background="bg-brand"
        // Styles the vendored word from outside: larger, and dark ink so it reads on orange in both themes.
        className="[&_.h-8]:h-12 [&_span.block]:font-semibold [&_span.block]:text-4xl [&_span.block]:text-on-brand [&_span.block]:tracking-tight"
        variant="words"
        words={PRELOADER_WORDS}
      />
      <CustomCursor />
      <ScrollProgress position="top" thickness={2} variant="bar" />
      <SiteHeader />
      <main>
        <HeroSection ready={!loading} />
        <ExpertiseSection />
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </LanguageProvider>
  );
}
