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
    <Reveal className="grid gap-6 border-t border-ink pt-6 lg:grid-cols-12 lg:gap-12">
      <p className="eyebrow flex gap-3 lg:col-span-3">
        <span className="text-lavender">{index}</span>
        <span>{label}</span>
      </p>
      <div className="lg:col-span-9">
        <h2 id={id} className="max-w-[18ch] font-serif text-title tracking-tight text-balance">
          {children}
        </h2>
        {aside && <div className="mt-6 max-w-2xl text-lede text-ink-soft">{aside}</div>}
      </div>
    </Reveal>
  );
}
