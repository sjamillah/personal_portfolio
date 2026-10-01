import { certifications, skillBands } from "@/content/skills";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

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

      <div className="mt-12 grid gap-x-14 gap-y-16 md:grid-cols-2 lg:mt-16 lg:grid-cols-3 xl:gap-x-20">
        {skillBands.map((band, bandIndex) => (
          <Reveal key={band.name} delay={bandIndex * 80}>
            <div className="flex items-baseline gap-3">
              <span className="text-[0.8125rem] text-green">{String.fromCharCode(65 + bandIndex)}</span>
              <h3 className="font-serif text-4xl tracking-tight">{band.name}</h3>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft md:min-h-[2.8125rem]">{band.note}</p>

            <div className="mt-7 border-t border-ink">
              {band.categories.map((category) => (
                <div key={category.name} className="border-b border-line py-7">
                  <h4 className="flex items-baseline justify-between gap-4 font-medium text-ink">
                    {category.name}
                    <span className="text-xs font-normal tabular-nums text-ink-faint">{category.items.length}</span>
                  </h4>
                  <ul className="mt-3 flex flex-wrap text-[0.9375rem] leading-7 text-ink-soft">
                    {category.items.map((item, index) => (
                      <li
                        key={item}
                        className="after:mx-1.5 after:text-line-strong after:content-['/'] last:after:content-none"
                      >
                        {item}
                        {index < category.items.length - 1 && <span className="sr-only">,</span>}
                      </li>
                    ))}
                  </ul>
                  {category.evidence.length > 0 && (
                    <p className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1.5 text-[0.8125rem]">
                      <span className="text-ink-faint">Used in</span>
                      {category.evidence.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          className="text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent"
                        >
                          {link.label}
                        </a>
                      ))}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-16 lg:mt-20">
        <h3 className="eyebrow">Certifications & courses</h3>
        <ul className="mt-5 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((cert) => (
            <li key={cert.name} className="border-t border-line pt-4">
              <p className="font-medium leading-snug text-ink">{cert.name}</p>
              <p className="mt-1 text-sm text-ink-soft">{cert.issuer}</p>
              <p className="mt-2 text-[0.8125rem] tabular-nums text-ink-faint">{cert.date}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
