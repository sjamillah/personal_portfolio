import { Fragment } from "react";
import { certifications, skillBands, training } from "@/content/skills";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import type { Certification, Link } from "@/lib/types";

function UsedIn({ links }: { links: Link[] }) {
  if (links.length === 0) return null;
  return (
    <p className="text-[0.9375rem] leading-relaxed text-ink-faint">
      Used in{" "}
      {links.map((link, index) => (
        <Fragment key={link.label}>
          <a
            href={link.href}
            className="text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent"
          >
            {link.label}
          </a>
          {index < links.length - 2 ? ", " : index === links.length - 2 ? " and " : ""}
        </Fragment>
      ))}
    </p>
  );
}

function CredentialGroup({ title, items }: { title: string; items: Certification[] }) {
  return (
    <Reveal className="grid gap-y-4 lg:grid-cols-12 lg:gap-x-12">
      <h3 className="font-serif text-3xl tracking-tight lg:col-span-3">{title}</h3>
      <ul className="lg:col-span-9 lg:mt-1">
        {items.map((item) => (
          <li
            key={item.name}
            className="flex flex-col gap-1 border-t border-line py-4 first:border-ink sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
          >
            <p>
              <span className="font-medium text-ink">{item.name}</span>
              <span className="text-ink-soft">, {item.issuer}</span>
            </p>
            <p className="shrink-0 text-[0.9375rem] tabular-nums text-ink-faint">{item.date}</p>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

export function Skills() {
  return (
    <section aria-labelledby="skills-title" id="skills" className="shell py-14 lg:py-20">
      <SectionHeading
        index="04"
        label="Skills"
        id="skills-title"
        aside="Where a group is used in my work, it links straight to the role or project that shows it."
      >
        A toolkit, organised by the job it does.
      </SectionHeading>

      <div className="mt-10 space-y-12 lg:mt-14 lg:space-y-14">
        {skillBands.map((band) => (
          <Reveal key={band.name}>
            <div className="grid gap-y-1 lg:grid-cols-12 lg:gap-x-12">
              <div className="lg:col-span-3">
                <h3 className="font-serif text-3xl tracking-tight">{band.name}</h3>
                <p className="mt-2 max-w-xs text-[0.9375rem] leading-relaxed text-ink-faint">{band.note}</p>
              </div>
              <dl className="mt-5 lg:col-span-9 lg:mt-1">
                {band.categories.map((category) => (
                  <div
                    key={category.name}
                    className="grid gap-x-10 gap-y-2 border-t border-line py-5 first:border-ink md:grid-cols-[11rem_minmax(0,1fr)] xl:grid-cols-[11rem_minmax(0,1fr)_15rem]"
                  >
                    <dt className="font-medium text-ink">{category.name}</dt>
                    <dd className="leading-relaxed text-ink-soft">{category.items.join(", ")}</dd>
                    <dd className="md:col-start-2 xl:col-start-3">
                      <UsedIn links={category.evidence} />
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-14 space-y-10 lg:mt-16">
        <CredentialGroup title="Certification" items={certifications} />
        <CredentialGroup title="Training" items={training} />
      </div>
    </section>
  );
}
