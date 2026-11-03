"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import Section from "./Section";
import Timeline from "./Timeline";

export default function EducationSection() {
  const { t } = useLanguage();

  return (
    <Section id="education" index="04" title={t.educationTitle} alt>
      <Timeline
        entries={t.education.map((entry) => ({
          title: entry.school,
          subtitle: entry.program,
          period: entry.period,
          location: entry.location,
          bullets: entry.bullets,
        }))}
      />
    </Section>
  );
}
