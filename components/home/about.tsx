import { principles } from "@/content/profile";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

export function About() {
  return (
    <section aria-labelledby="about-title" id="about" className="shell py-14 lg:py-20">
      <SectionHeading
        index="01"
        label="About"
        id="about-title"
        aside={
          <p>
            <span className="text-ink">
              I work across the whole of an application: the data model and the API, the client on top of it, the
              pipeline that ships it and the cloud it runs on.
            </span>{" "}
            Python on the backend is home. TypeScript, React and Flutter are where I go when the work reaches the
            interface.
          </p>
        }
      >
        Most of my work sits where one layer hands off to the next.
      </SectionHeading>

      <Reveal className="mt-10 lg:mt-12">
        <h3 className="sr-only">How I work</h3>
        <ol className="grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((principle, index) => (
            <li key={principle.title} className="flex flex-col bg-paper p-6 lg:min-h-56 lg:p-7">
              <span className="font-mono text-xs text-lavender">{String(index + 1).padStart(2, "0")}</span>
              <p className="mt-6 font-serif text-[1.75rem] leading-[1.1] tracking-tight text-ink lg:mt-auto">
                {principle.title}
              </p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">{principle.body}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
