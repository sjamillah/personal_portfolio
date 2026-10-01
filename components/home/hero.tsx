import Image from "next/image";
import portrait from "@/assets/jamillah-s.jpg";
import { profile, proof } from "@/content/profile";
import { ArrowDown, ArrowRight, ArrowUpRight } from "@/components/icons";

export function Hero() {
  const [role, focus] = profile.title.split(" | ");

  return (
    <section id="home" aria-labelledby="home-title">
      <div className="bg-paper-sunk">
        <div className="shell grid gap-x-12 pt-10 sm:pt-14 md:grid-cols-12 lg:pt-16">
          <div className="flex flex-col justify-center pb-12 md:col-span-7 md:pb-16 lg:pb-20">
            <p className="flex items-center gap-2.5 text-[0.9375rem] text-ink-soft">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
              <span>
                <span className="font-medium text-ink">{role}</span>
                <span aria-hidden="true" className="mx-2 text-line-strong">/</span>
                <span className="sr-only">, </span>
                {focus}
              </span>
            </p>

            <h1 id="home-title" className="mt-8 font-serif text-ink">
              <span className="block whitespace-nowrap text-[clamp(2.75rem,0.75rem+5.2vw,6rem)] font-medium leading-[0.95] tracking-[-0.03em]">
                {profile.greeting}
              </span>
              <span className="mt-5 block max-w-[22ch] text-[clamp(1.625rem,1.1rem+1.6vw,2.5rem)] font-normal leading-[1.15] tracking-[-0.01em] text-balance">
                {profile.headline.lead} <em className="text-accent">{profile.headline.accent}</em>
              </span>
            </h1>

            <p className="mt-6 max-w-[34rem] text-[1.0625rem] leading-relaxed text-ink-soft">{profile.intro}</p>

            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
              <a
                href="#projects"
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-brand px-6 text-sm font-medium text-on-brand transition-colors hover:bg-brand-hover"
              >
                View projects
                <ArrowDown className="transition-transform duration-300 group-hover:translate-y-0.5" />
              </a>
              <a href="#contact" className="group inline-flex items-center gap-2 text-sm font-medium text-ink">
                <span className="link-underline">Contact me</span>
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
            </div>

            <p className="mt-10 text-sm text-ink-faint">Based in {profile.location}</p>
          </div>

          <figure className="self-end md:col-span-5 lg:col-start-8">
            <Image
              src={portrait}
              alt="Portrait of Jamillah Ssozi"
              priority
              placeholder="blur"
              sizes="(min-width: 1024px) 38vw, (min-width: 768px) 40vw, 100vw"
              className="aspect-[4/5] w-full rounded-t-[4px] object-cover object-[50%_20%] sm:max-md:max-w-md"
            />
          </figure>
        </div>
      </div>

      <div className="shell pt-12 lg:pt-16">
        <h2 className="eyebrow">Evidence from the work</h2>
        <ul className="mt-4 grid grid-cols-2 gap-x-8 border-t border-ink lg:grid-cols-4 lg:gap-x-12">
          {proof.map((item) => (
            <li key={item.value}>
              <a href={item.href} className="group flex h-full flex-col gap-2.5 py-6 lg:py-7">
                <span className="flex items-start justify-between gap-4">
                  <span className="font-serif text-[2.5rem] font-medium leading-none tracking-tight text-ink sm:text-5xl">
                    {item.value}
                  </span>
                  <ArrowUpRight className="mt-1 hidden shrink-0 text-ink-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent sm:block" />
                </span>
                <span className="max-w-[26ch] text-sm leading-snug text-ink-soft sm:text-[0.9375rem]">{item.label}</span>
                <span className="mt-auto pt-1 text-xs text-ink-faint">{item.source}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
