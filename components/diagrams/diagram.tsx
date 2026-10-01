import { useId } from "react";
import type { DiagramSpec } from "@/lib/types";

type DiagramProps = {
  spec: DiagramSpec;
  highlight?: readonly string[];
  className?: string;
  decorative?: boolean;
};

const NODE_HEIGHT = 56;

export function Diagram({ spec, highlight, className, decorative = false }: DiagramProps) {
  const uid = useId().replace(/:/g, "");
  const titleId = `${uid}-title`;
  const descId = `${uid}-desc`;
  const arrowId = `${uid}-arrow`;
  const arrowAccentId = `${uid}-arrow-accent`;
  const lit = highlight ? new Set(highlight) : null;
  const dim = (id: string) => (lit && !lit.has(id) ? 0.22 : 1);

  return (
    <svg
      viewBox={`0 0 ${spec.width} ${spec.height}`}
      className={className}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative || undefined}
      aria-labelledby={decorative ? undefined : titleId}
      aria-describedby={decorative ? undefined : descId}
    >
      {!decorative && (
        <>
          <title id={titleId}>{spec.title}</title>
          <desc id={descId}>{spec.description}</desc>
        </>
      )}
      <defs>
        <marker id={arrowId} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 1 9 5 0 9" fill="none" stroke="var(--ink-faint)" strokeWidth="1.5" />
        </marker>
        <marker id={arrowAccentId} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 1 9 5 0 9" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
        </marker>
      </defs>

      <g fill="none" strokeWidth="1.25" strokeLinejoin="round">
        {spec.edges.map((edge) => {
          const accent = Boolean(lit?.has(edge.id));
          return (
            <g key={edge.id} style={{ opacity: dim(edge.id), transition: "opacity 400ms" }}>
              <polyline
                points={edge.points.map((point) => point.join(",")).join(" ")}
                stroke={accent ? "var(--accent)" : "var(--ink-faint)"}
                strokeDasharray={edge.dashed ? "4 4" : undefined}
                markerEnd={edge.arrow === false ? undefined : `url(#${accent ? arrowAccentId : arrowId})`}
              />
              {edge.label && edge.labelAt && (
                <text
                  x={edge.labelAt[0]}
                  y={edge.labelAt[1]}
                  textAnchor={edge.points[0][0] === edge.points[edge.points.length - 1][0] ? "start" : "middle"}
                  fill={accent ? "var(--accent)" : "var(--ink-faint)"}
                  stroke="none"
                  style={{ font: "500 11px var(--font-geist-mono), monospace" }}
                >
                  {edge.label}
                </text>
              )}
            </g>
          );
        })}
      </g>

      {spec.nodes.map((node) => {
        const h = node.h ?? NODE_HEIGHT;
        const accent = node.tone === "accent";
        const muted = node.tone === "muted";
        return (
          <g key={node.id} style={{ opacity: dim(node.id), transition: "opacity 400ms" }}>
            <rect
              x={node.x}
              y={node.y}
              width={node.w}
              height={h}
              rx="3"
              fill={muted ? "transparent" : accent ? "var(--accent-soft)" : "var(--green-soft)"}
              stroke={accent ? "var(--accent)" : "var(--line-strong)"}
              strokeDasharray={muted ? "3 3" : undefined}
              strokeWidth="1"
            />
            <text
              x={node.x + 14}
              y={node.y + (node.meta ? 24 : h / 2 + 5)}
              fill="var(--ink)"
              style={{ font: "500 14px var(--font-geist), sans-serif" }}
            >
              {node.label}
            </text>
            {node.meta && (
              <text
                x={node.x + 14}
                y={node.y + 42}
                fill="var(--ink-faint)"
                style={{ font: "400 11px var(--font-geist-mono), monospace" }}
              >
                {node.meta}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

export function DiagramFlows({ spec }: { spec: DiagramSpec }) {
  const names = new Map(spec.nodes.map((node) => [node.id, node.label]));
  return (
    <ol className="grid gap-x-8 text-sm text-ink-soft sm:grid-cols-2">
      {spec.edges.map((edge) => (
        <li key={edge.id} className="flex flex-wrap items-baseline gap-x-2 border-b border-line py-2">
          <span className="text-ink">{names.get(edge.from)}</span>
          <span aria-hidden="true" className="text-green">
            →
          </span>
          <span className="sr-only">to</span>
          <span className="text-ink">{names.get(edge.to)}</span>
          {edge.label && <span className="text-ink-faint">({edge.label})</span>}
        </li>
      ))}
    </ol>
  );
}
