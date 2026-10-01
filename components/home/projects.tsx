import { ProjectsIndex } from "@/components/home/projects-index";
import { SectionHeading } from "@/components/section-heading";

export function Projects() {
  return (
    <section aria-labelledby="projects-title" id="projects" className="shell py-20 lg:py-32">
      <SectionHeading
        index="03"
        label="Projects"
        id="projects-title"
        aside="Personal, academic and hackathon work, separate from the roles above. Each opens into a full case study."
      >
        The work is the argument.
      </SectionHeading>

      <div className="mt-14 lg:mt-20">
        <ProjectsIndex />
      </div>
    </section>
  );
}
