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
            <span className="text-ink">Python on the backend is home.</span> TypeScript, React and Flutter are where I go
            when the work reaches the interface. Whatever the layer, the same four habits hold.
          </p>
        }
      >
        Most of my work sits where one layer hands off to the next.
      </SectionHeading>

      <Reveal className="mt-10 lg:mt-12">
        <h3 className="sr-only">How I work</h3>
        <ol className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((principle, index) => (
            <li key={principle.title} className="border-t border-line pt-5">
              <span className="text-sm font-medium text-green">{String(index + 1).padStart(2, "0")}</span>
              <p className="mt-3 font-serif text-2xl leading-[1.15] tracking-tight text-ink">{principle.title}</p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">{principle.body}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
