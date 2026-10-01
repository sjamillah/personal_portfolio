import Link from "next/link";
import { ArrowLeft } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[70dvh] flex-col justify-center py-24">
      <p className="eyebrow">
        <span className="text-green">404</span> · Not found
      </p>
      <h1 className="mt-6 max-w-[14ch] font-serif text-display tracking-tight">This page isn&apos;t here.</h1>
      <Link href="/" className="group mt-10 inline-flex items-center gap-2 text-sm font-medium">
        <ArrowLeft className="transition-transform duration-300 group-hover:-translate-x-0.5" />
        <span className="link-underline">Back to the homepage</span>
      </Link>
    </section>
  );
}
