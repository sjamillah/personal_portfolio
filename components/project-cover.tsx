import { Diagram } from "@/components/diagrams/diagram";
import type { Project } from "@/lib/types";

export function ProjectCover({ project, className = "" }: { project: Project; className?: string }) {
  return (
    <div className={`rounded-[4px] bg-paper-sunk p-5 sm:p-8 ${className}`}>
      <Diagram spec={project.architecture.diagram} decorative className="h-auto w-full" />
    </div>
  );
}
