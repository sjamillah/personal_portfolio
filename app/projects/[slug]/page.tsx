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
          <span className="text-[0.8125rem] text-green">{String(index).padStart(2, "0")}</span>
          <span className="font-serif text-4xl tracking-tight sm:text-5xl">{title}</span>
        </h2>
        <div className="mt-6">{children}</div>
      </Reveal>
    </section>
  );
}

function DetailGrid({ items }: { items: DetailItem[] }) {
  return (
    <ul className={`grid gap-x-10 gap-y-9 sm:grid-cols-2 ${items.length % 3 === 0 ? "lg:grid-cols-3" : ""}`}>
      {items.map((item, index) => (
        <li key={item.title} className="border-t border-line pt-5">
          <p className="text-sm font-medium text-green">{String(index + 1).padStart(2, "0")}</p>
          <h3 className="mt-2 font-medium text-ink">{item.title}</h3>
          <p className="mt-2 leading-relaxed text-ink-soft">{item.body}</p>
        </li>
      ))}
    </ul>
  );
}

function ProjectHeader({ project }: { project: Project }) {
  return (
    <header className="shell pb-12 pt-8 sm:pt-10 lg:pb-14">
      <Link href="/#projects" className="group inline-flex items-center gap-2 text-sm font-medium text-ink-faint hover:text-ink">
        <ArrowLeft className="transition-transform duration-300 group-hover:-translate-x-0.5" />
        All projects
      </Link>

      <p className="eyebrow mt-10 flex flex-wrap gap-x-3">
        <span className="text-green">{project.index}</span>
        <span>{project.kind}</span>
      </p>
      <h1 className="mt-5 max-w-[16ch] font-serif text-display tracking-[-0.02em] text-balance">{project.name}</h1>

      {project.awards && (
        <ul aria-label="Awards" className="mt-10 flex flex-wrap gap-x-14 gap-y-6">
          {project.awards.map((award) => (
            <li key={award.event} className="flex items-end gap-4">
              <span className="font-serif text-7xl leading-[0.8] tracking-tight text-accent sm:text-8xl">
                {award.place.split(" ")[0]}
              </span>
              <span className="pb-1">
                <span className="block font-medium text-ink">{award.event}</span>
                <span className="block text-sm text-ink-faint">
                  {award.place} · {award.year}
                </span>
              </span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
        <p className="text-lede text-ink-soft lg:col-span-7">{project.tagline}</p>
        <dl className="grid gap-5 text-sm lg:col-span-4 lg:col-start-9">
          <div>
            <dt className="text-[0.8125rem] text-ink-faint">Focus</dt>
            <dd className="mt-1 text-ink">{project.focus}</dd>
          </div>
          <div>
            <dt className="text-[0.8125rem] text-ink-faint">Code</dt>
            <dd className="mt-1 flex items-center gap-2 text-ink">
              {project.code === "public" ? <Code /> : <Lock />}
              {project.code === "public" ? "Public repository" : "Private repository"}
            </dd>
          </div>
          {project.links.length > 0 && (
            <div>
              <dt className="text-[0.8125rem] text-ink-faint">Links</dt>
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

      <div className="shell grid gap-12 pb-16 lg:grid-cols-12 lg:gap-12 lg:pb-24">
        <aside className="hidden lg:col-span-3 lg:block">
          <div className="sticky top-24">
            <CaseStudyNav sections={sections} />
          </div>
        </aside>

        <div className="min-w-0 space-y-14 lg:col-span-9 lg:space-y-20">
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
                  <span className="text-[0.8125rem] text-ink-faint sm:pt-1">{String(index + 1).padStart(2, "0")}</span>
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
                  <div className="min-w-[600px] rounded-[4px] bg-paper-sunk p-5 sm:p-8">
                    <Diagram spec={project.architecture.diagram} className="h-auto w-full" />
                  </div>
                </div>
                <figcaption className="mt-3 text-[0.8125rem] text-ink-faint">{project.architecture.diagram.title}</figcaption>
              </figure>
            )}
            <details className="group mt-8 border-y border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-sm font-medium text-ink [&::-webkit-details-marker]:hidden">
                Read the diagram as a list
                <span aria-hidden="true" className="text-lg leading-none text-ink-faint transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="border-t border-line py-4">
                <DiagramFlows spec={project.architecture.diagram} />
              </div>
            </details>
          </Block>

          <Block id="implementation" index={4} title="Implementation">
            <DetailGrid items={project.implementation} />
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
            <dl className="flex flex-wrap gap-x-14 gap-y-8">
              {project.metrics.map((metric) => (
                <div key={metric.label} className="flex max-w-[16rem] flex-col-reverse">
                  <dt className="mt-2 text-sm leading-snug text-ink-faint">{metric.label}</dt>
                  <dd className="font-serif text-4xl leading-none tracking-tight sm:text-5xl">{metric.value}</dd>
                </div>
              ))}
            </dl>
            {project.results.length > 0 && (
              <ul className="mt-10 max-w-2xl space-y-4">
                {project.results.map((result) => (
                  <li key={result} className="flex gap-4 text-lede text-ink">
                    <span aria-hidden="true" className="mt-[0.7em] h-px w-5 shrink-0 bg-accent" />
                    <span>{result}</span>
                  </li>
                ))}
              </ul>
            )}
          </Block>

          <Block id="technologies" index={7} title="Technologies">
            <dl className="border-t border-line">
              {project.technologies.map((group) => (
                <div key={group.label} className="grid gap-3 border-b border-line py-5 sm:grid-cols-[14rem_1fr] sm:gap-6">
                  <dt className="text-[0.8125rem] text-ink-faint sm:pt-1.5">{group.label}</dt>
                  <dd>
                    <ul className="flex flex-wrap gap-y-1 text-ink">
                      {group.items.map((item, index) => (
                        <li
                          key={item}
                          className="after:mx-2 after:text-line-strong after:content-['/'] last:after:content-none"
                        >
                          {item}
                          {index < group.items.length - 1 && <span className="sr-only">,</span>}
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
        <Link href={`/projects/${next.slug}`} className="group shell flex items-end justify-between gap-6 py-10 lg:py-14">
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
