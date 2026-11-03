import Reveal from "./Reveal";

export interface TimelineEntry {
  title: string;
  subtitle: string;
  period: string;
  location: string;
  bullets: string[];
}

export default function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ol className="relative space-y-6 border-border border-l pl-6 md:pl-10">
      {entries.map((entry) => (
        <li key={entry.title} className="relative">
          <span
            aria-hidden="true"
            className="-left-[29px] md:-left-[45px] absolute top-8 size-2.5 rounded-full bg-brand shadow-[0_0_0_4px_color-mix(in_oklab,var(--color-brand)_22%,transparent)]"
          />
          <Reveal>
            <article className="rounded-2xl border border-border bg-card p-6 shadow-xs md:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="font-semibold text-lg tracking-tight">{entry.title}</h3>
                <span className="font-mono text-brand-strong text-xs">{entry.period}</span>
              </div>
              <p className="mt-1 font-medium text-foreground/80">{entry.subtitle}</p>
              <p className="mt-0.5 text-muted-foreground text-sm">{entry.location}</p>
              <ul className="mt-5 space-y-2">
                {entry.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-muted-foreground text-sm leading-relaxed">
                    <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-brand" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
