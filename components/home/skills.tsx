import { certifications, skillBands } from "@/content/skills";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

export function Skills() {
  return (
    <section aria-labelledby="skills-title" id="skills" className="shell py-20 lg:py-32">
      <SectionHeading
        index="04"
        label="Skills"
        id="skills-title"
        aside="Grouped by what they are for, with links to where each group is used in real work."
      >
          A toolkit, organised by the job it does.
      </SectionHeading>

      <div className="mt-14 space-y-20 lg:mt-20 lg:space-y-24">
        {skillBands.map((band, bandIndex) => (
          <Reveal key={band.name} className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-3">
              <div className="lg:sticky lg:top-24">
                <p className="font-mono text-xs text-lavender">
                  {String.fromCharCode(65 + bandIndex)}
                </p>
                <h3 className="mt-2 font-serif text-5xl tracking-tight">{band.name}</h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-soft">{band.note}</p>
              </div>
            </div>

            <div className="border-t border-line lg:col-span-9">
              {band.categories.map((category) => (
                <div
                  key={category.name}
                  className="grid gap-4 border-b border-line py-6 md:grid-cols-9 md:gap-8 lg:py-7"
                >
                  <h4 className="font-medium text-ink md:col-span-3">
                    {category.name}
                    <span className="ml-2 font-mono text-xs font-normal text-ink-faint">{category.items.length}</span>
                  </h4>
                  <div className="md:col-span-6">
                    <ul className="flex flex-wrap gap-x-1 gap-y-2 text-ink-soft">
                      {category.items.map((item, index) => (
                        <li key={item} className="after:mx-1.5 after:text-line-strong after:content-['/'] last:after:content-none">
                          {item}
                          {index < category.items.length - 1 && <span className="sr-only">,</span>}
                        </li>
                      ))}
                    </ul>
                    {category.evidence.length > 0 && (
                      <p className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1 font-mono text-xs">
                        <span className="text-ink-faint">Used in</span>
                        {category.evidence.map((link) => (
                          <a
                            key={link.label}
                            href={link.href}
                            className="text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                          >
                            {link.label}
                          </a>
                        ))}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-24 grid gap-8 lg:mt-32 lg:grid-cols-12 lg:gap-12">
        <h3 className="eyebrow lg:col-span-3">Certifications & courses</h3>
        <ul className="grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:col-span-9">
          {certifications.map((cert) => (
            <li key={cert.name} className="bg-paper p-5">
              <p className="font-medium text-ink">{cert.name}</p>
              <p className="mt-1 text-sm text-ink-soft">{cert.issuer}</p>
              <p className="mt-3 font-mono text-xs text-ink-faint">{cert.date}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
