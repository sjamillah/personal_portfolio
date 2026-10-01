import Image from "next/image";
import portrait from "@/assets/jamillah-s.jpg";
import { profile, proof } from "@/content/profile";
import { ArrowDown, ArrowRight, ArrowUpRight } from "@/components/icons";

export function Hero() {
  const [role, focus] = profile.title.split(" | ");

  return (
    <section id="home" aria-labelledby="home-title">
      <div className="grid bg-paper-sunk md:min-h-[min(88vh,54rem)] md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <figure className="relative aspect-[4/5] max-h-[78vh] w-full md:order-2 md:aspect-auto md:max-h-none">
          <Image
            src={portrait}
            alt="Portrait of Jamillah Ssozi"
            priority
            placeholder="blur"
            quality={90}
            fill
            sizes="(min-width: 768px) 54vw, 100vw"
            className="object-cover object-[50%_18%]"
          />
        </figure>

        <div className="flex flex-col justify-center px-4 py-12 sm:px-8 sm:py-16 md:order-1 md:py-16 md:pr-10 lg:py-20 lg:pl-[max(3rem,calc((100vw-88rem)/2+3rem))] lg:pr-14">
          <p className="flex items-start gap-2.5 text-[0.9375rem] text-ink-soft">
            <span aria-hidden="true" className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-accent" />
            <span>
              <span className="font-medium text-ink md:max-lg:block">{role}</span>
              <span aria-hidden="true" className="mx-2 text-line-strong md:max-lg:hidden">/</span>
              <span className="sr-only">, </span>
              {focus}
            </span>
          </p>

          <h1 id="home-title" className="mt-8 font-serif text-ink">
            <span className="block text-[clamp(2.75rem,0.5rem+4.5vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.03em]">
              {profile.greeting}
            </span>
            <span className="mt-5 block max-w-[22ch] text-[clamp(1.5rem,1rem+1.4vw,2.375rem)] font-normal leading-[1.15] tracking-[-0.01em] text-balance">
              {profile.headline.lead} <em className="text-accent">{profile.headline.accent}</em>
            </span>
          </h1>

          <p className="mt-6 max-w-[32rem] text-[1.0625rem] leading-relaxed text-ink-soft">{profile.intro}</p>

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
                <span className="max-w-[30ch] text-[0.9375rem] leading-snug text-ink-soft sm:text-base">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
