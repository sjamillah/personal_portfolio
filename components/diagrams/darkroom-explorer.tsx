"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { Diagram } from "@/components/diagrams/diagram";
import { darkroomDiagram } from "@/content/projects";

const views = [
  {
    id: "delivery",
    label: "Delivery path",
    highlight: ["github", "actions", "ecr", "deploy", "ecs", "github-actions", "actions-ecr", "ecr-deploy", "deploy-ecs"],
    heading: "A commit becomes a running task only after it has been tested.",
    points: [
      "GitHub Actions runs lint and tests; the build job depends on them, so a failing test never reaches ECR.",
      "CI starts the built container, waits for /health, and checks it is not running as root before pushing.",
      "The workflow authenticates with OIDC. There are no AWS access keys in either repository.",
      "The image push starts CodePipeline, and CodeDeploy shifts traffic blue/green, with alarms able to roll back.",
    ],
  },
  {
    id: "request",
    label: "Request path",
    highlight: [
      "visitor", "alb", "ecs", "rds", "s3", "cloudfront", "secrets",
      "visitor-alb", "alb-ecs", "ecs-rds", "secrets-ecs", "ecs-s3", "s3-cloudfront", "cloudfront-visitor",
    ],
    heading: "Pages come from the containers. Images come from the edge.",
    points: [
      "The load balancer forwards to Fargate tasks running in private subnets with no route to the internet.",
      "Descriptions are stored in RDS PostgreSQL; the database password is injected from Secrets Manager.",
      "Images are written to a private S3 bucket and served only through CloudFront using origin access control.",
    ],
  },
  {
    id: "health",
    label: "Health checks",
    highlight: ["alb", "ecs", "rds", "alb-ecs", "ecs-rds"],
    heading: "/health never queries the database. That is deliberate.",
    points: [
      "If the load balancer's health check depended on PostgreSQL, a database failover would fail every target at once and drain the whole service over a blip Multi-AZ recovers from.",
      "/health answers liveness only, so a healthy container stays in service during a database interruption.",
      "/ready reports database reachability separately, for dashboards and diagnosis rather than for the load balancer.",
    ],
  },
] as const;

export function DarkroomExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const uid = useId();
  const active = views[activeIndex];

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const last = views.length - 1;
    const moves: Record<string, number> = {
      ArrowRight: activeIndex === last ? 0 : activeIndex + 1,
      ArrowLeft: activeIndex === 0 ? last : activeIndex - 1,
      Home: 0,
      End: last,
    };
    const next = moves[event.key];
    if (next === undefined) return;
    event.preventDefault();
    setActiveIndex(next);
    tabs.current[next]?.focus();
  }

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      <div className="min-w-0 lg:col-span-4">
        <div role="tablist" aria-label="Darkroom architecture views" className="flex flex-wrap gap-2 lg:flex-col lg:items-start">
          {views.map((view, index) => {
            const selected = index === activeIndex;
            return (
              <button
                key={view.id}
                ref={(node) => {
                  tabs.current[index] = node;
                }}
                id={`${uid}-tab-${view.id}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`${uid}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveIndex(index)}
                onKeyDown={onKeyDown}
                className={`group flex items-center gap-3 rounded-full border px-4 py-2 text-sm transition-colors lg:rounded-none lg:border-0 lg:border-l-2 lg:px-0 lg:pl-4 lg:text-base ${
                  selected
                    ? "border-ink bg-ink text-paper lg:border-accent lg:bg-transparent lg:text-ink"
                    : "border-line text-ink-soft hover:border-line-strong hover:text-ink lg:border-line"
                }`}
              >
                <span className="font-mono text-xs">0{index + 1}</span>
                {view.label}
              </button>
            );
          })}
        </div>

        <div
          id={`${uid}-panel`}
          role="tabpanel"
          aria-labelledby={`${uid}-tab-${active.id}`}
          className="mt-8"
          aria-live="polite"
        >
          <p className="font-serif text-2xl leading-tight tracking-tight text-ink sm:text-3xl">{active.heading}</p>
          <ul className="mt-6 space-y-3 text-[0.9375rem] leading-relaxed text-ink-soft">
            {active.points.map((point) => (
              <li key={point} className="flex gap-3">
                <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-accent" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <figure className="min-w-0 lg:col-span-8">
        <div
          tabIndex={0}
          role="region"
          aria-label="Darkroom architecture diagram, scrolls horizontally on small screens"
          className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0"
        >
          <div className="min-w-[640px] rounded-sm border border-line bg-paper p-4 sm:p-6">
            <Diagram spec={darkroomDiagram} highlight={active.highlight} className="h-auto w-full" />
          </div>
        </div>
        <figcaption className="mt-3 font-mono text-xs text-ink-faint">
          Darkroom on AWS. Select a view to trace one path through the system.
        </figcaption>
      </figure>
    </div>
  );
}
