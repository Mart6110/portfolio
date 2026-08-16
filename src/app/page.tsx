"use client";

import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import SiteHeader from "@/components/SiteHeader";
import HeroSection from "@/components/HeroSection";
import ExpertiseSection from "@/components/ExpertiseSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import ContactSection from "@/components/ContactSection";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <LanguageProvider>
      <SiteHeader />
      <main>
        <HeroSection />
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
