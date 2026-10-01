import { Diagram } from "@/components/diagrams/diagram";
import type { Project } from "@/lib/types";

export function ProjectCover({ project, className = "" }: { project: Project; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-sm border border-line bg-paper-raised ${className}`}>
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-60 [background-image:linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] [background-size:32px_32px]"
      />
      <div className="relative flex items-center justify-between border-b border-line px-4 py-3 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-ink-faint">
        <span>
          {project.index} · {project.domain}
        </span>
        <span>{project.code === "public" ? "Public code" : "Private code"}</span>
      </div>
      <div className="relative p-4 sm:p-6">
        <Diagram spec={project.architecture.diagram} decorative className="h-auto w-full" />
      </div>
    </div>
  );
}
