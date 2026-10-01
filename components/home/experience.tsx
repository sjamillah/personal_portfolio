import { experience } from "@/content/experience";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import type { Role, Workstream } from "@/lib/types";

function IssueGrid({ resolved, total }: { resolved: number; total: number }) {
  return (
    <div
      role="img"
      aria-label={`${resolved} of ${total} accessibility issues resolved`}
      className="flex max-w-[26rem] flex-wrap gap-1"
    >
      {Array.from({ length: total }, (_, index) => (
        <span
          key={index}
          className={`size-2.5 rounded-[2px] sm:size-3 ${
            index < resolved ? "bg-accent" : "border border-dashed border-ink-faint"
          }`}
        />
      ))}
    </div>
  );
}

function Points({ points }: { points: string[] }) {
  return (
    <ul className="max-w-[62ch] space-y-2.5 text-ink-soft">
      {points.map((point) => (
        <li key={point} className="flex gap-3 leading-relaxed">
          <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-green" />
          <span>{point}</span>
        </li>
      ))}
    </ul>
  );
}

function Strand({ stream, titled }: { stream: Workstream; titled: boolean }) {
  const isArms = stream.name === "ARMS";
  return (
    <div>
      {titled && (
        <h4 className="mb-3 text-ink">
          <span className="font-medium">{stream.name}</span>
          <span className="text-ink-faint"> — {stream.area}</span>
        </h4>
      )}
      <Points points={stream.points} />
      {isArms && (
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <p className="font-serif text-5xl leading-none tracking-tight">
            55<span className="text-ink-faint">/58</span>
          </p>
          <div>
            <IssueGrid resolved={55} total={58} />
            <p className="mt-2 text-sm text-ink-faint">accessibility issues resolved against WCAG 2.2</p>
          </div>
        </div>
      )}
    </div>
  );
}

function RoleEntry({ role }: { role: Role }) {
  const titled = role.workstreams.length > 1;
  const hasArms = role.workstreams.some((stream) => stream.name === "ARMS");

  return (
    <article
      aria-labelledby={`role-${role.id}`}
      className="grid gap-6 border-t border-line py-10 lg:grid-cols-12 lg:gap-12 lg:py-12"
    >
      <div className="lg:sticky lg:top-24 lg:col-span-4 lg:self-start">
        <h3 id={`role-${role.id}`} className="font-serif text-[1.75rem] leading-[1.1] tracking-tight sm:text-3xl">
          {role.title}
        </h3>
        <p className="mt-2 text-ink-soft">
          <span className="font-medium text-ink">{role.org}</span>
          <span aria-hidden="true" className="mx-2 text-line-strong">
            ·
          </span>
          <span className="sr-only">, </span>
          <time dateTime={role.startISO}>{role.start}</time>
          <span aria-hidden="true"> – </span>
          <span className="sr-only"> to </span>
          <time dateTime={role.endISO}>{role.end}</time>
        </p>
      </div>

      <div className="lg:col-span-8">
        <p className="max-w-[60ch] text-lede text-ink">{role.summary}</p>

        {role.metrics && !hasArms && (
          <dl className="mt-6 flex flex-wrap gap-x-12 gap-y-4">
            {role.metrics.map((metric) => (
              <div key={metric.label} className="flex flex-col-reverse">
                <dt className="mt-1 text-sm text-ink-faint">{metric.label}</dt>
                <dd className="font-serif text-5xl leading-none tracking-tight">{metric.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-7 space-y-8">
          {role.workstreams.map((stream) => (
            <Strand key={stream.name} stream={stream} titled={titled} />
          ))}
        </div>
      </div>
    </article>
  );
}

export function Experience() {
  return (
    <section aria-labelledby="experience-title" id="experience" className="bg-paper-sunk py-14 lg:py-20">
      <div className="shell">
        <SectionHeading
          index="02"
          label="Experience"
          id="experience-title"
          aside="Three roles between 2024 and 2026, most recent first."
        >
          Where the engineering happened.
        </SectionHeading>

        <div className="mt-8 lg:mt-10">
          {experience.map((role) => (
            <Reveal key={role.id}>
              <RoleEntry role={role} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
