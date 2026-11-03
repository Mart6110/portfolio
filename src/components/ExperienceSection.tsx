"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import Section from "./Section";
import Timeline from "./Timeline";

export default function ExperienceSection() {
  const { t } = useLanguage();

  return (
    <Section id="experience" index="03" title={t.experienceTitle}>
      <Timeline
        entries={t.jobs.map((job) => ({
          title: job.company,
          subtitle: job.role,
          period: job.period,
          location: job.location,
          bullets: job.bullets,
        }))}
      />
    </Section>
  );
}
