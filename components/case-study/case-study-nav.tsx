"use client";

import { useEffect, useState } from "react";

type Section = { id: string; label: string };

export function CaseStudyNav({ sections }: { sections: readonly Section[] }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    sections.forEach(({ id }) => {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    });
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav aria-label="Case study sections">
      <ol className="space-y-1 border-l border-line">
        {sections.map((section, index) => {
          const current = section.id === active;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={current ? "location" : undefined}
                className={`-ml-px flex items-baseline gap-3 border-l py-1.5 pl-4 text-sm transition-colors ${
                  current ? "border-accent text-ink" : "border-transparent text-ink-faint hover:text-ink"
                }`}
              >
                <span className="font-mono text-[0.6875rem]">{String(index + 1).padStart(2, "0")}</span>
                {section.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
