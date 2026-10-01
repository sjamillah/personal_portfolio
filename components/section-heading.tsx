import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";

type SectionHeadingProps = {
  index: string;
  label: string;
  id: string;
  children: ReactNode;
};

export function SectionHeading({ index, label, id, children }: SectionHeadingProps) {
  return (
    <Reveal className="border-t border-ink pt-5">
      <p className="eyebrow flex gap-3">
        <span className="text-green">{index}</span>
        <span>{label}</span>
      </p>
      <h2 id={id} className="mt-4 max-w-[26ch] font-serif text-title tracking-tight text-balance">
        {children}
      </h2>
    </Reveal>
  );
}
