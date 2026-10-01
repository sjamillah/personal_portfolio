import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { CaseStudyNav } from "@/components/case-study/case-study-nav";
import { DarkroomExplorer } from "@/components/diagrams/darkroom-explorer";
import { Diagram, DiagramFlows } from "@/components/diagrams/diagram";
import { ArrowLeft, ArrowRight, ArrowUpRight, Code, Lock } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { getProject, projects } from "@/content/projects";
import type { DetailItem, Project } from "@/lib/types";

const sections = [
  { id: "problem", label: "Problem" },
  { id: "approach", label: "Approach" },
  { id: "architecture", label: "Architecture" },
  { id: "implementation", label: "Implementation" },
  { id: "challenges", label: "Challenges" },
  { id: "results", label: "Results" },
  { id: "technologies", label: "Technologies" },
] as const;

type PageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.summary,
    openGraph: { title: project.name, description: project.summary },
  };
}

function Block({ id, index, title, children }: { id: string; index: number; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={`${id}-title`} id={id} className="scroll-mt-24 border-t border-line pt-8">
      <Reveal>
        <h2 id={`${id}-title`} className="flex items-baseline gap-4">
          <span className="font-mono text-xs text-lavender">{String(index).padStart(2, "0")}</span>
          <span className="font-serif text-4xl tracking-tight sm:text-5xl">{title}</span>
        </h2>
        <div className="mt-8">{children}</div>
      </Reveal>
    </section>
  );
}

function DetailGrid({ items, columns = 2 }: { items: DetailItem[]; columns?: 2 | 3 }) {
  return (
    <ul className={`grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 ${columns === 3 ? "xl:grid-cols-3" : ""}`}>
      {items.map((item, index) => (
        <li key={item.title} className="bg-paper p-6">
          <p className="font-mono text-xs text-ink-faint">{String(index + 1).padStart(2, "0")}</p>
          <h3 className="mt-3 font-medium text-ink">{item.title}</h3>
          <p className="mt-2 leading-relaxed text-ink-soft">{item.body}</p>
        </li>
      ))}
    </ul>
  );
}

const metricColumns: Record<number, string> = { 1: "max-w-sm", 2: "sm:grid-cols-2", 3: "sm:grid-cols-3" };

function ProjectHeader({ project }: { project: Project }) {
  return (
    <header className="shell pb-16 pt-10 sm:pt-14 lg:pb-20">
      <Link href="/#projects" className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.08em] text-ink-faint hover:text-ink">
        <ArrowLeft className="transition-transform duration-300 group-hover:-translate-x-0.5" />
        All projects
      </Link>

      <p className="eyebrow mt-12 flex flex-wrap gap-x-3">
        <span className="text-lavender">{project.index}</span>
        <span>{project.kind}</span>
      </p>
      <h1 className="mt-5 max-w-[16ch] font-serif text-display tracking-[-0.02em] text-balance">{project.name}</h1>

      {project.awards && (
        <ul aria-label="Awards" className="mt-10 grid max-w-3xl gap-3 sm:grid-cols-2">
          {project.awards.map((award) => (
            <li key={award.event} className="flex items-center gap-5 rounded-sm bg-accent p-5 text-on-accent">
              <span className="font-serif text-5xl leading-none">{award.place.split(" ")[0]}</span>
              <span>
                <span className="block font-medium">{award.event}</span>
                <span className="block font-mono text-xs">
                  {award.place} · {award.year}
                </span>
              </span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-12">
        <p className="text-lede text-ink-soft lg:col-span-7">{project.tagline}</p>
        <dl className="grid gap-5 text-sm lg:col-span-4 lg:col-start-9">
          <div>
            <dt className="font-mono text-xs text-ink-faint">Focus</dt>
            <dd className="mt-1 text-ink">{project.focus}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs text-ink-faint">Code</dt>
            <dd className="mt-1 flex items-center gap-2 text-ink">
              {project.code === "public" ? <Code /> : <Lock />}
              {project.code === "public" ? "Public repository" : "Private repository"}
            </dd>
          </div>
          {project.links.length > 0 && (
            <div>
              <dt className="font-mono text-xs text-ink-faint">Links</dt>
              <dd className="mt-1">
                <ul className="space-y-1">
                  {project.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1.5 text-ink underline decoration-line-strong underline-offset-4 hover:decoration-accent"
                      >
                        {link.label}
                        <ArrowUpRight className="text-ink-faint group-hover:text-accent" />
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          )}
        </dl>
      </div>

      <dl className={`mt-14 grid gap-px overflow-hidden rounded-sm border border-line bg-line ${metricColumns[project.metrics.length] ?? "sm:grid-cols-3"}`}>
        {project.metrics.map((metric) => (
          <div key={metric.label} className="flex flex-col-reverse bg-paper-raised p-6">
            <dt className="mt-2 font-mono text-xs text-ink-faint">{metric.label}</dt>
            <dd className="font-serif text-4xl leading-none tracking-tight sm:text-5xl">{metric.value}</dd>
          </div>
        ))}
      </dl>
    </header>
  );
}

export default async function ProjectPage({ params }: PageProps) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const position = projects.findIndex((item) => item.slug === project.slug);
  const next = projects[(position + 1) % projects.length];
  const isDarkroom = project.slug === "darkroom";

  return (
    <article>
      <ProjectHeader project={project} />

      <div className="shell grid gap-12 pb-24 lg:grid-cols-12 lg:gap-12 lg:pb-32">
        <aside className="hidden lg:col-span-3 lg:block">
          <div className="sticky top-24">
            <CaseStudyNav sections={sections} />
          </div>
        </aside>

        <div className="min-w-0 space-y-20 lg:col-span-9 lg:space-y-28">
          <Block id="problem" index={1} title="Problem">
            <div className="max-w-2xl space-y-5 text-lede text-ink-soft">
              {project.problem.map((paragraph, index) => (
                <p key={paragraph} className={index === 0 ? "text-ink" : undefined}>
                  {paragraph}
                </p>
              ))}
            </div>
          </Block>

          <Block id="approach" index={2} title="Approach">
            <ol className="border-t border-line">
              {project.approach.map((step, index) => (
                <li key={step.title} className="grid gap-2 border-b border-line py-5 sm:grid-cols-[3rem_14rem_1fr] sm:gap-6">
                  <span className="font-mono text-xs text-ink-faint sm:pt-1">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="font-medium text-ink">{step.title}</h3>
                  <p className="leading-relaxed text-ink-soft">{step.body}</p>
                </li>
              ))}
            </ol>
          </Block>

          <Block id="architecture" index={3} title="Architecture">
            <p className="mb-10 max-w-2xl text-lede text-ink-soft">{project.architecture.intro}</p>
            {isDarkroom ? (
              <DarkroomExplorer />
            ) : (
              <figure>
                <div
                  tabIndex={0}
                  role="region"
                  aria-label={`${project.architecture.diagram.title}, scrolls horizontally on small screens`}
                  className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0"
                >
                  <div className="min-w-[600px] rounded-sm border border-line p-4 sm:p-6">
                    <Diagram spec={project.architecture.diagram} className="h-auto w-full" />
                  </div>
                </div>
                <figcaption className="mt-3 font-mono text-xs text-ink-faint">{project.architecture.diagram.title}</figcaption>
              </figure>
            )}
            <details className="group mt-8 rounded-sm border border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-sm text-ink [&::-webkit-details-marker]:hidden">
                Read the diagram as a list
                <span aria-hidden="true" className="font-mono text-ink-faint transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="border-t border-line px-5 py-4">
                <DiagramFlows spec={project.architecture.diagram} />
              </div>
            </details>
          </Block>

          <Block id="implementation" index={4} title="Implementation">
            <DetailGrid items={project.implementation} columns={project.implementation.length > 4 ? 3 : 2} />
          </Block>

          <Block id="challenges" index={5} title="Challenges">
            <div className="space-y-10">
              {project.challenges.map((challenge) => (
                <div key={challenge.title} className="grid gap-3 md:grid-cols-9 md:gap-8">
                  <h3 className="font-serif text-2xl leading-tight tracking-tight md:col-span-3">{challenge.title}</h3>
                  <p className="max-w-2xl leading-relaxed text-ink-soft md:col-span-6">{challenge.body}</p>
                </div>
              ))}
            </div>
          </Block>

          <Block id="results" index={6} title="Results">
            <ul className="max-w-2xl space-y-4">
              {project.results.map((result) => (
                <li key={result} className="flex gap-4 text-lede text-ink">
                  <span aria-hidden="true" className="mt-[0.7em] h-px w-5 shrink-0 bg-accent" />
                  <span>{result}</span>
                </li>
              ))}
            </ul>
          </Block>

          <Block id="technologies" index={7} title="Technologies">
            <dl className="border-t border-line">
              {project.technologies.map((group) => (
                <div key={group.label} className="grid gap-3 border-b border-line py-5 sm:grid-cols-[14rem_1fr] sm:gap-6">
                  <dt className="font-mono text-xs text-ink-faint sm:pt-1.5">{group.label}</dt>
                  <dd>
                    <ul className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <li key={item} className="rounded-full bg-lavender-soft px-3 py-1 text-sm text-ink">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
          </Block>
        </div>
      </div>

      <nav aria-label="Next project" className="border-t border-line">
        <Link href={`/projects/${next.slug}`} className="group shell flex items-end justify-between gap-6 py-14 lg:py-20">
          <span>
            <span className="eyebrow block">Next project · {next.index}</span>
            <span className="mt-4 block font-serif text-title tracking-tight text-balance">
              <span className="link-underline">{next.name}</span>
            </span>
          </span>
          <ArrowRight width={32} height={32} className="mb-3 shrink-0 text-ink-faint transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent" />
        </Link>
      </nav>
    </article>
  );
}
