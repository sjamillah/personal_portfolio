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
                className="group block py-6 sm:py-7"
              >
                <div className="flex items-start gap-4 sm:gap-6">
                  <span
                    className={`pt-2 text-[0.8125rem] transition-colors ${
                      selected ? "text-ink" : "text-ink-faint"
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
                    <p className="mt-2 text-sm text-ink-faint">{project.kind}</p>
                    <p className="mt-4 max-w-lg leading-relaxed text-ink-soft">{project.summary}</p>

                    {project.awards && (
                      <ul aria-label="Awards" className="mt-4 space-y-1 text-[0.9375rem] text-ink">
                        {project.awards.map((award) => (
                          <li key={award.event} className="flex items-baseline gap-2.5">
                            <span aria-hidden="true" className="text-accent">
                              ★
                            </span>
                            <span>
                              <span className="font-medium">{award.place}</span>, {award.event} {award.year}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <p className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm">
                      {project.metrics.slice(0, 2).map((metric) => (
                        <span key={metric.label}>
                          <span className="font-medium text-ink">{metric.value}</span>{" "}
                          <span className="text-ink-faint">{metric.label}</span>
                        </span>
                      ))}
                    </p>

                    <ProjectCover project={project} className="mt-6 hidden sm:block lg:hidden" />
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
          <p className="mt-4 text-sm text-ink-faint">{active.focus}</p>
        </div>
      </div>
    </div>
  );
}
