"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "@/components/icons";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex h-11 shrink-0 items-center gap-2 self-start rounded-full bg-signal px-5 text-sm font-medium text-on-signal transition-colors hover:bg-ink hover:text-paper sm:self-auto"
    >
      {copied ? <Check /> : <Copy />}
      <span aria-live="polite">{copied ? "Copied" : "Copy email"}</span>
    </button>
  );
}
