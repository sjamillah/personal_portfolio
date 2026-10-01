import { experience } from "@/content/experience";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import type { Role } from "@/lib/types";

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

function AccessibilityEvidence() {
  return (
    <div className="mt-8 rounded-sm border border-line bg-paper-raised p-5 sm:p-7">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <p className="eyebrow">ARMS · accessibility in practice</p>
        <p className="font-mono text-xs text-ink-faint">WCAG 2.2</p>
      </div>
      <div className="mt-6 grid gap-8 sm:grid-cols-[auto_1fr] sm:items-end sm:gap-10">
        <p className="font-serif text-7xl leading-none tracking-tight sm:text-8xl">
          55<span className="text-ink-faint">/58</span>
        </p>
        <IssueGrid resolved={55} total={58} />
      </div>
      <dl className="mt-8 grid gap-x-8 gap-y-4 border-t border-line pt-6 text-sm sm:grid-cols-2">
        {[
          ["Screen readers", "TalkBack and VoiceOver"],
          ["On device", "44 screens tested"],
          ["Text", "Large font-scale support"],
          ["Layout", "Responsive tablet layouts"],
          ["Regression", "Automated accessibility guard tests"],
          ["Semantics", "Screen-reader accessibility"],
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

function RoleEntry({ role }: { role: Role }) {
  const hasArms = role.workstreams.some((stream) => stream.name === "ARMS");
  return (
    <article aria-labelledby={`role-${role.id}`} className="grid gap-6 border-t border-line py-12 lg:grid-cols-12 lg:gap-12 lg:py-16">
      <div className="lg:col-span-3">
        <p className="font-mono text-sm text-ink">
          <time dateTime={role.startISO}>{role.start}</time>
          <span aria-hidden="true"> — </span>
          <span className="sr-only"> to </span>
          <time dateTime={role.endISO}>{role.end}</time>
        </p>
        <p className="mt-2 text-ink-soft">{role.org}</p>
      </div>

      <div className="lg:col-span-9">
        <h3 id={`role-${role.id}`} className="font-serif text-3xl tracking-tight sm:text-4xl">
          {role.title}
        </h3>
        <p className="mt-4 max-w-2xl text-lede text-ink-soft">{role.summary}</p>

        {role.metrics && !hasArms && (
          <dl className="mt-8 flex flex-wrap gap-x-12 gap-y-6">
            {role.metrics.map((metric) => (
              <div key={metric.label} className="flex flex-col-reverse">
                <dt className="mt-2 font-mono text-xs text-ink-faint">{metric.label}</dt>
                <dd className="font-serif text-5xl leading-none tracking-tight">{metric.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <div className={`mt-10 grid gap-10 ${role.workstreams.length > 1 ? "md:grid-cols-2" : ""}`}>
          {role.workstreams.map((stream) => (
            <div key={stream.name}>
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
          ))}
        </div>

        {hasArms && <AccessibilityEvidence />}

        <ul aria-label="Tools and practices" className="mt-8 flex flex-wrap gap-2">
          {role.stack.map((item) => (
            <li key={item} className="rounded-full bg-lavender-soft px-3 py-1 font-mono text-xs text-ink">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export function Experience() {
  return (
    <section aria-labelledby="experience-title" id="experience" className="bg-paper-sunk py-20 lg:py-32">
      <div className="shell">
        <SectionHeading
          index="02"
          label="Experience"
          id="experience-title"
          aside="Professional roles across backend engineering, full-stack development, machine learning and accessibility."
        >
          Where the engineering happened.
        </SectionHeading>

        <div className="mt-14 lg:mt-20">
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
