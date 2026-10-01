import { ProjectsIndex } from "@/components/home/projects-index";
import { SectionHeading } from "@/components/section-heading";

export function Projects() {
  return (
    <section aria-labelledby="projects-title" id="projects" className="shell py-14 lg:py-20">
      <SectionHeading
        index="03"
        label="Independent projects"
        id="projects-title"
      >
        The work is the argument.
      </SectionHeading>

      <div className="mt-10 lg:mt-12">
        <ProjectsIndex />
      </div>
    </section>
  );
}
