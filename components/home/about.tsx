import { layers } from "@/content/profile";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

export function About() {
  return (
    <section aria-labelledby="about-title" id="about" className="shell py-20 lg:py-32">
      <SectionHeading index="01" label="About" id="about-title">
        Most of my work sits where one layer hands off to the next.
      </SectionHeading>

      <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-12">
        <div className="max-w-2xl space-y-6 text-lede text-ink-soft lg:col-span-7 lg:col-start-4">
          <Reveal>
            <p>
              <span className="text-ink">
                I work across the whole of an application: the data model and the API, the web or mobile client on top
                of it, the pipeline that tests and ships it, and the cloud it runs on.
              </span>{" "}
              Python on the backend is home. TypeScript, React and Flutter are where I go when the work moves to the
              interface.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <p>
              Testing is part of how I build, not a phase after it: test-driven development, Git Flow and SOLID on
              AmaliTech&apos;s InsightFlow services, more than 137 automated tests on Aureynx, and a container smoke test
              before anything reaches Darkroom&apos;s registry.
            </p>
          </Reveal>
          <Reveal delay={160}>
            <p>
              Machine learning runs through much of my work, from classification pipelines and transfer learning to
              models served behind an API. And I treat accessibility as engineering: on ARMS I worked against WCAG 2.2
              with TalkBack and VoiceOver, and wrote tests that stop resolved issues from coming back.
            </p>
          </Reveal>
        </div>
      </div>

      <Reveal className="mt-20 lg:mt-28">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-12">
          <h3 className="eyebrow lg:col-span-3">Across the stack</h3>
          <p className="max-w-xl text-ink-soft lg:col-span-9">
            Six layers, and where each one shows up in the work.
          </p>
        </div>
        <ol className="mt-8 border-t border-line">
          {layers.map((layer, index) => (
            <li
              key={layer.name}
              className="group grid gap-2 border-b border-line py-6 transition-colors hover:bg-paper-raised sm:grid-cols-[3rem_1fr] lg:grid-cols-12 lg:gap-12 lg:py-7"
            >
              <span className="font-mono text-xs text-lavender transition-colors group-hover:text-ink lg:col-span-1 lg:pt-1.5">
                L{index + 1}
              </span>
              <div className="sm:col-start-2 lg:col-span-11 lg:col-start-2 lg:grid lg:grid-cols-11 lg:gap-12">
                <p className="font-serif text-2xl tracking-tight text-ink lg:col-span-3 lg:text-3xl">{layer.name}</p>
                <p className="mt-2 max-w-xl text-ink-soft lg:col-span-5 lg:mt-1">{layer.work}</p>
                <p className="mt-3 font-mono text-xs leading-relaxed text-ink-faint lg:col-span-3 lg:mt-2">
                  <span className="sr-only">Shows up in: </span>
                  {layer.evidence.join(" · ")}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
