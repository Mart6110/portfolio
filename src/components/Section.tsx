import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

interface SectionProps {
  id: string;
  index: string;
  title: string;
  subtitle?: string;
  alt?: boolean;
  children: ReactNode;
}

export default function Section({ id, index, title, subtitle, alt = false, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("px-4 py-20 sm:px-6 md:py-28", alt && "bg-muted/50 dark:bg-black/15")}
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-12 max-w-2xl">
          <p aria-hidden="true" className="mb-4 flex items-center gap-3 font-mono text-brand-strong text-xs tracking-widest">
            {index}
            <span className="h-px w-10 bg-brand/50" />
          </p>
          <h2 id={`${id}-title`} className="font-bold text-3xl tracking-tight md:text-4xl">
            {title}
          </h2>
          {subtitle && <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{subtitle}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
