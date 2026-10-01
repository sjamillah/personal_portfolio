import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";

type SectionHeadingProps = {
  index: string;
  label: string;
  id: string;
  children: ReactNode;
  aside?: ReactNode;
};

export function SectionHeading({ index, label, id, children, aside }: SectionHeadingProps) {
  return (
    <Reveal className="grid gap-5 border-t border-ink pt-5 lg:grid-cols-12 lg:items-end lg:gap-12">
      <div className="lg:col-span-7">
        <p className="eyebrow flex gap-3">
          <span className="text-lavender">{index}</span>
          <span>{label}</span>
        </p>
        <h2 id={id} className="mt-4 font-serif text-title tracking-tight text-balance">
          {children}
        </h2>
      </div>
      {aside && (
        <div className="max-w-xl text-[1.0625rem] leading-relaxed text-ink-soft lg:col-span-5 lg:pb-1.5">{aside}</div>
      )}
    </Reveal>
  );
}
