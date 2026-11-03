"use client";

import { useState, type CSSProperties, type Ref } from "react";
import { ArrowUpRightIcon } from "lucide-react";
import Badge from "@/components/smoothui/badge";
import GlowHover from "@/components/smoothui/glow-hover-card";
import ScrollImageReveal from "@/components/smoothui/scroll-image-reveal";
import SmoothButton from "@/components/smoothui/smooth-button";
import { TabsIndicator, TabsList, TabsPanel, TabsRoot, TabsTab } from "@/components/smoothui/tabs";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { projects, type Project } from "@/lib/projects";
import { useTheme } from "@/lib/theme/ThemeContext";
import { cn } from "@/lib/utils";
import { GithubIcon } from "./icons";
import Reveal from "./Reveal";
import Section from "./Section";

type Filter = "all" | Project["category"];

const FILTERS: Filter[] = ["all", "frontend", "fullstack", "ai", "mobile"];

interface ProjectCardProps {
  project: Project;
  className?: string;
  style?: CSSProperties;
  ref?: Ref<HTMLElement>;
}

function ProjectCard({ project, className, style, ref }: ProjectCardProps) {
  const { t, locale } = useLanguage();
  // GlowHover renders a second, aria-hidden copy of each card for the glow and marks it
  // with this class. `inert` keeps that copy's links out of the tab order.
  const isGlowCopy = className?.includes("glow-overlay-item");

  return (
    <article
      ref={ref}
      inert={isGlowCopy}
      className={cn(
        "flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-xs motion-safe:animate-in motion-safe:fade-in-0 motion-safe:duration-300",
        className
      )}
      style={style}
    >
      <p className="mb-4 font-mono text-muted-foreground text-xs uppercase tracking-widest">
        {t.projectFilters[project.category]}
      </p>
      <h3 className="font-semibold text-xl tracking-tight">{project.title}</h3>
      <p className="mt-3 text-muted-foreground text-sm leading-relaxed">{project.description[locale]}</p>
      <ul className="mt-5 flex flex-wrap gap-1.5">
        {project.tech.map((tech) => (
          <li key={tech}>
            <Badge variant="secondary">{tech}</Badge>
          </li>
        ))}
      </ul>
      <div className="mt-auto flex flex-wrap gap-2 pt-6">
        <SmoothButton asChild size="sm" variant="outline">
          <a href={project.repoUrl} rel="noreferrer" target="_blank">
            <GithubIcon size={16} />
            {t.projectLinks.code}
            <span className="sr-only">: {project.title}</span>
          </a>
        </SmoothButton>
        {project.demoUrl && (
          <SmoothButton asChild size="sm" variant="ghost">
            <a href={project.demoUrl} rel="noreferrer" target="_blank">
              <ArrowUpRightIcon />
              {t.projectLinks.demo}
              <span className="sr-only">: {project.title}</span>
            </a>
          </SmoothButton>
        )}
      </div>
    </article>
  );
}

type FeaturedProject = Project & { screenshot: NonNullable<Project["screenshot"]> };

const featuredProjects = projects.filter((project): project is FeaturedProject => project.screenshot !== undefined);

function FeaturedProjectRow({ project, flipped }: { project: FeaturedProject; flipped: boolean }) {
  const { t, locale } = useLanguage();
  const { theme } = useTheme();

  return (
    <article className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
      <div className={cn("@container md:col-span-7", flipped && "md:order-2")}>
        {/* ScrollImageReveal makes the image 2 × parallax taller than the frame so it has room to travel.
            The frame is that much shorter than the 16:10 screenshot, so the image box stays 16:10 and
            object-cover never crops its sides. Keep 48px = 2 × parallax. */}
        <ScrollImageReveal
          alt={project.screenshot.alt[locale]}
          className="h-[calc(100cqw*0.625-48px)] w-full border border-border bg-muted shadow-black/10 shadow-xl"
          direction={flipped ? "right" : "left"}
          once
          parallax={24}
          rounded="rounded-xl"
          src={project.screenshot[theme]}
        />
      </div>
      <Reveal className="md:col-span-5">
        <p className="mb-4 font-mono text-brand-strong text-xs uppercase tracking-widest">
          {t.projectsFeatured} · {t.projectFilters[project.category]}
        </p>
        <h3 className="font-bold text-2xl tracking-tight md:text-3xl">{project.title}</h3>
        <p className="mt-4 text-muted-foreground leading-relaxed">{project.description[locale]}</p>
        <ul className="mt-6 flex flex-wrap gap-1.5">
          {project.tech.map((tech) => (
            <li key={tech}>
              <Badge variant="secondary">{tech}</Badge>
            </li>
          ))}
        </ul>
        <SmoothButton asChild className="mt-8" variant="outline">
          <a href={project.repoUrl} rel="noreferrer" target="_blank">
            <GithubIcon size={16} />
            {t.projectLinks.code}
            <span className="sr-only">: {project.title}</span>
            <ArrowUpRightIcon />
          </a>
        </SmoothButton>
      </Reveal>
    </article>
  );
}

export default function ProjectsSection() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<Filter>("all");

  const projectsFor = (key: Filter) => projects.filter((project) => key === "all" || project.category === key);

  return (
    <Section id="projects" index="02" title={t.projectsTitle} subtitle={t.projectsSubtitle} alt>
      <div className="mb-24 space-y-20 md:mb-32 md:space-y-28">
        {featuredProjects.map((project, index) => (
          <FeaturedProjectRow key={project.slug} flipped={index % 2 === 1} project={project} />
        ))}
      </div>

      <Reveal>
        <p className="mb-6 font-mono text-muted-foreground text-xs uppercase tracking-widest">{t.projectsAll}</p>
        <TabsRoot value={filter} onValueChange={(value) => setFilter(value as Filter)}>
          <div className="-mx-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
            <TabsList variant="pill">
              {FILTERS.map((key) => (
                <TabsTab key={key} value={key} className="px-3 py-2 sm:px-4">
                  {t.projectFilters[key]}
                  <span className="hidden font-mono text-xs opacity-60 sm:inline">{projectsFor(key).length}</span>
                </TabsTab>
              ))}
              <TabsIndicator />
            </TabsList>
          </div>

          {FILTERS.map((key) => (
            <TabsPanel key={key} value={key} className="pt-8 text-base text-foreground">
              <GlowHover
                className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
                items={projectsFor(key).map((project) => ({
                  id: project.slug,
                  element: <ProjectCard project={project} />,
                }))}
              />
            </TabsPanel>
          ))}
        </TabsRoot>
      </Reveal>
    </Section>
  );
}
