"use client";

import Link from "next/link";
import { useState } from "react";
import { projects } from "@/content/projects";
import { ArrowUpRight } from "@/components/icons";
import { ProjectCover } from "@/components/project-cover";

export function ProjectsIndex() {
  const [activeSlug, setActiveSlug] = useState(projects[0].slug);
  const active = projects.find((project) => project.slug === activeSlug) ?? projects[0];

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
      <ol className="border-t border-line lg:col-span-6">
        {projects.map((project) => {
          const selected = project.slug === activeSlug;
          return (
            <li key={project.slug} className="border-b border-line">
              <Link
                href={`/projects/${project.slug}`}
                onMouseEnter={() => setActiveSlug(project.slug)}
                onFocus={() => setActiveSlug(project.slug)}
                className="group block py-7 sm:py-8"
              >
                <div className="flex items-start gap-4 sm:gap-6">
                  <span
                    className={`pt-2 font-mono text-xs transition-colors ${
                      selected ? "text-accent" : "text-ink-faint"
                    }`}
                  >
                    {project.index}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-serif text-3xl leading-[1.05] tracking-tight text-balance sm:text-4xl">
                        <span className="link-underline">{project.name}</span>
                      </h3>
                      <ArrowUpRight
                        width={20}
                        height={20}
                        className={`mt-2 shrink-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${
                          selected ? "text-accent" : "text-ink-faint"
                        }`}
                      />
                    </div>
                    <p className="mt-2 font-mono text-xs text-ink-faint">{project.kind}</p>
                    <p className="mt-4 max-w-lg leading-relaxed text-ink-soft">{project.summary}</p>

                    {project.awards && (
                      <ul aria-label="Awards" className="mt-5 flex flex-wrap gap-2">
                        {project.awards.map((award) => (
                          <li
                            key={award.event}
                            className="inline-flex items-center gap-2 rounded-full bg-signal px-3 py-1 text-xs font-medium text-on-signal"
                          >
                            <span aria-hidden="true">★</span>
                            {award.place}, {award.event} {award.year}
                          </li>
                        ))}
                      </ul>
                    )}

                    <p className="mt-5 flex flex-wrap gap-x-6 gap-y-1 font-mono text-xs">
                      {project.metrics.slice(0, 2).map((metric) => (
                        <span key={metric.label}>
                          <span className="text-ink">{metric.value}</span>{" "}
                          <span className="text-ink-faint">{metric.label}</span>
                        </span>
                      ))}
                    </p>

                    <ProjectCover project={project} className="mt-6 lg:hidden" />
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ol>

      <div aria-hidden="true" className="hidden lg:col-span-6 lg:block">
        <div className="sticky top-24">
          <ProjectCover key={active.slug} project={active} className="animate-[cover-in_500ms_var(--ease-out-soft)]" />
          <div className="mt-5 flex items-baseline justify-between gap-6">
            <p className="font-serif text-2xl tracking-tight">{active.name}</p>
            <p className="font-mono text-xs text-ink-faint">{active.focus}</p>
          </div>
          <ul className="mt-4 flex flex-wrap gap-2">
            {active.technologies
              .flatMap((group) => group.items)
              .slice(0, 8)
              .map((item) => (
                <li key={item} className="rounded-full bg-lavender-soft px-3 py-1 font-mono text-xs text-ink">
                  {item}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
