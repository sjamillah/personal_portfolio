import { Fragment } from "react";
import { certifications, skillBands } from "@/content/skills";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import type { Link } from "@/lib/types";

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

      <Reveal className="mt-14 grid gap-y-5 lg:mt-16 lg:grid-cols-12 lg:gap-x-12">
        <h3 className="font-serif text-3xl tracking-tight lg:col-span-3">Certifications</h3>
        <ul className="grid gap-x-10 sm:grid-cols-2 lg:col-span-9">
          {certifications.map((cert) => (
            <li key={cert.name} className="border-t border-line py-4 sm:[&:nth-child(-n+2)]:border-ink">
              <p className="font-medium text-ink">{cert.name}</p>
              <p className="mt-1 text-[0.9375rem] text-ink-soft">
                {cert.issuer}
                <span aria-hidden="true" className="mx-2 text-line-strong">
                  ·
                </span>
                <span className="sr-only">, </span>
                <span className="text-ink-faint">{cert.date}</span>
              </p>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
