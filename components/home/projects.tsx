import Link from "next/link";
import { DarkroomExplorer } from "@/components/diagrams/darkroom-explorer";
import { ArrowRight } from "@/components/icons";
import { ProjectsIndex } from "@/components/home/projects-index";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

export function Projects() {
  return (
    <section aria-labelledby="projects-title" id="projects" className="pt-20 lg:pt-32">
      <div className="shell">
        <SectionHeading
          index="03"
          label="Projects"
          id="projects-title"
          aside="Personal, academic and hackathon projects, separate from the professional roles above. Each one opens into a case study; where the code is private, it says so."
        >
          The work is the argument.
        </SectionHeading>

        <div className="mt-14 lg:mt-20">
          <ProjectsIndex />
        </div>
      </div>

      <div className="mt-24 border-y border-line bg-paper-raised py-20 lg:mt-32 lg:py-28">
        <div className="shell">
          <Reveal className="mb-12 grid gap-6 lg:mb-16 lg:grid-cols-12 lg:gap-12">
            <p className="eyebrow lg:col-span-3">
              <span className="text-lavender">In depth</span> · Darkroom
            </p>
            <div className="lg:col-span-9">
              <h3 className="max-w-[22ch] font-serif text-4xl leading-[1.05] tracking-tight text-balance sm:text-5xl">
                Using AWS is easy. Deciding what a health check should depend on is the engineering.
              </h3>
              <Link
                href="/projects/darkroom"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink"
              >
                <span className="link-underline">Read the Darkroom case study</span>
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Reveal>
          <Reveal>
            <DarkroomExplorer />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
