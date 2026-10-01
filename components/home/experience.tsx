import { experience } from "@/content/experience";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import type { Role, Workstream } from "@/lib/types";

function IssueGrid({ resolved, total }: { resolved: number; total: number }) {
  return (
    <div>
      <div
        role="img"
        aria-label={`${resolved} of ${total} accessibility issues resolved`}
        className="flex max-w-[30rem] flex-wrap gap-1"
      >
        {Array.from({ length: total }, (_, index) => (
          <span
            key={index}
            className={`size-3 rounded-[2px] sm:size-3.5 ${
              index < resolved ? "bg-accent" : "border border-dashed border-ink-faint"
            }`}
          />
        ))}
      </div>
      <p aria-hidden="true" className="mt-3 flex gap-5 font-mono text-xs text-ink-faint">
        <span className="flex items-center gap-2">
          <span className="size-2 rounded-[1px] bg-accent" />
          Resolved
        </span>
        <span className="flex items-center gap-2">
          <span className="size-2 rounded-[1px] border border-dashed border-ink-faint" />
          Open
        </span>
      </p>
    </div>
  );
}

function AccessibilityPanel({ stream }: { stream: Workstream }) {
  return (
    <div className="rounded-sm border border-line bg-paper-raised p-5 sm:p-6">
      <h4 className="flex flex-wrap items-baseline justify-between gap-3">
        <span className="flex items-baseline gap-3">
          <span className="font-medium text-ink">{stream.name}</span>
          <span className="font-mono text-xs text-ink-faint">{stream.area}</span>
        </span>
        <span className="font-mono text-xs text-ink-faint">WCAG 2.2</span>
      </h4>
      <p className="mt-3 max-w-xl leading-relaxed text-ink-soft">{stream.points[0]}</p>
      <div className="mt-6 grid gap-6 sm:grid-cols-[auto_1fr] sm:items-end sm:gap-8">
        <p className="font-serif text-6xl leading-none tracking-tight sm:text-7xl">
          55<span className="text-ink-faint">/58</span>
        </p>
        <IssueGrid resolved={55} total={58} />
      </div>
      <dl className="mt-6 grid gap-x-8 gap-y-4 border-t border-line pt-5 text-sm sm:grid-cols-2">
        {[
          ["On device", "44 screens tested"],
          ["Text", "Large font-scale support"],
          ["Layout", "Responsive tablet layouts"],
          ["Regression", "Automated accessibility guard tests"],
        ].map(([term, detail]) => (
          <div key={term} className="flex flex-col gap-0.5">
            <dt className="font-mono text-xs text-ink-faint">{term}</dt>
            <dd className="text-ink">{detail}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function WorkstreamList({ stream }: { stream: Workstream }) {
  return (
    <div>
      <h4 className="flex items-baseline gap-3 border-b border-line pb-3">
        <span className="font-medium text-ink">{stream.name}</span>
        <span className="font-mono text-xs text-ink-faint">{stream.area}</span>
      </h4>
      <ul className="mt-4 space-y-3 text-ink-soft">
        {stream.points.map((point) => (
          <li key={point} className="flex gap-3 leading-relaxed">
            <span aria-hidden="true" className="mt-3 h-px w-3 shrink-0 bg-lavender" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RoleEntry({ role }: { role: Role }) {
  const lists = role.workstreams.filter((stream) => stream.name !== "ARMS");
  const panel = role.workstreams.find((stream) => stream.name === "ARMS");

  return (
    <article
      aria-labelledby={`role-${role.id}`}
      className="grid gap-8 border-t border-line py-10 lg:grid-cols-12 lg:gap-12 lg:py-12"
    >
      <div className="lg:sticky lg:top-24 lg:col-span-5 lg:self-start">
        <p className="flex flex-wrap items-baseline gap-x-3 font-mono text-sm">
          <span className="text-ink">
            <time dateTime={role.startISO}>{role.start}</time>
            <span aria-hidden="true"> — </span>
            <span className="sr-only"> to </span>
            <time dateTime={role.endISO}>{role.end}</time>
          </span>
          <span className="text-ink-faint">{role.org}</span>
        </p>
        <h3 id={`role-${role.id}`} className="mt-4 font-serif text-3xl leading-[1.05] tracking-tight sm:text-4xl">
          {role.title}
        </h3>
        <p className="mt-4 max-w-md text-[1.0625rem] leading-relaxed text-ink-soft">{role.summary}</p>
      </div>

      <div className="space-y-8 lg:col-span-7">
        {role.metrics && !panel && (
          <dl className="flex flex-wrap gap-x-12 gap-y-6">
            {role.metrics.map((metric) => (
              <div key={metric.label} className="flex flex-col-reverse">
                <dt className="mt-2 font-mono text-xs text-ink-faint">{metric.label}</dt>
                <dd className="font-serif text-5xl leading-none tracking-tight">{metric.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {lists.length > 0 && (
          <div className={`grid gap-8 ${lists.length > 1 ? "md:grid-cols-2" : ""}`}>
            {lists.map((stream) => (
              <WorkstreamList key={stream.name} stream={stream} />
            ))}
          </div>
        )}

        {panel && <AccessibilityPanel stream={panel} />}
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
          aside="From full-stack TypeScript, through machine learning, to Python backend services and accessibility engineering."
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
