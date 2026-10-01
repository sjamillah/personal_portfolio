import { profile, proof } from "@/content/profile";
import { ArrowDown, ArrowRight, ArrowUpRight } from "@/components/icons";

export function Hero() {
  return (
    <section id="home" aria-labelledby="home-title" className="shell pb-20 pt-10 sm:pt-16 lg:pb-28 lg:pt-20">
      <p className="eyebrow flex items-center gap-3">
        <span aria-hidden="true" className="inline-block size-1.5 rounded-full bg-signal" />
        {profile.title}
      </p>

      <h1
        id="home-title"
        className="mt-8 font-serif text-display tracking-[-0.02em] text-balance sm:mt-10"
      >
        {profile.headline.lead} <br className="hidden md:block" />
        <em className="text-accent-display">{profile.headline.accent}</em>
      </h1>

      <div className="mt-12 grid gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <p className="max-w-xl text-lede text-ink-soft">{profile.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-signal px-6 text-sm font-medium text-on-signal transition-colors hover:bg-ink hover:text-paper"
            >
              View projects
              <ArrowDown className="transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
            <a
              href="#contact"
              className="group inline-flex h-12 items-center gap-2 rounded-full border border-line-strong px-6 text-sm font-medium text-ink transition-colors hover:border-ink"
            >
              Contact me
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <h2 className="eyebrow mb-4 flex justify-between">
            <span>Evidence</span>
            <span className="hidden sm:inline">From the work, not a summary of it</span>
          </h2>
          <ul className="border-t border-line">
            {proof.map((item) => (
              <li key={item.value} className="border-b border-line">
                <a
                  href={item.href}
                  className="group grid grid-cols-[6.5rem_1fr_auto] items-baseline gap-4 py-4 sm:grid-cols-[8.5rem_1fr_auto] sm:py-5"
                >
                  <span className="font-mono text-xl tracking-tight text-ink sm:text-2xl">{item.value}</span>
                  <span>
                    <span className="block text-[0.9375rem] leading-snug text-ink">{item.label}</span>
                    <span className="mt-1 block font-mono text-xs text-ink-faint">{item.source}</span>
                  </span>
                  <ArrowUpRight className="text-ink-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
