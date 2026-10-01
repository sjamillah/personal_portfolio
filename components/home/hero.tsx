import Image from "next/image";
import portrait from "@/assets/jamillah.jpg";
import { profile, proof } from "@/content/profile";
import { ArrowDown, ArrowRight, ArrowUpRight } from "@/components/icons";

const cellLayout = [
  "border-b border-r pr-4 sm:pr-6 lg:border-b-0",
  "border-b pl-4 sm:pl-6 lg:border-b-0 lg:border-r lg:px-6",
  "border-r pr-4 sm:pr-6 lg:px-6",
  "pl-4 sm:pl-6",
];

export function Hero() {
  const [role, focus] = profile.title.split(" | ");

  return (
    <section id="home" aria-labelledby="home-title" className="shell pb-6 pt-4 sm:pb-16 sm:pt-6 lg:pb-20">
      <div className="grid overflow-hidden rounded-[4px] md:min-h-[min(82vh,48rem)] md:grid-cols-12">
        <figure className="relative aspect-square md:order-2 md:col-span-5 md:aspect-auto">
          <Image
            src={portrait}
            alt="Portrait of Jamillah Ssozi"
            priority
            placeholder="blur"
            fill
            sizes="(min-width: 768px) 42vw, 100vw"
            className="object-cover object-[50%_28%]"
          />
          <figcaption className="absolute bottom-4 left-4 rounded-full bg-paper/90 px-3 py-1.5 font-mono text-[0.6875rem] text-ink backdrop-blur-sm">
            {profile.location}
          </figcaption>
        </figure>

        <div className="night flex flex-col bg-paper px-6 pb-8 pt-7 sm:px-10 sm:pb-10 sm:pt-9 md:order-1 md:col-span-7 lg:px-14 lg:pb-14 lg:pt-12">
          <div>
            <p className="font-serif text-3xl leading-none tracking-tight text-ink sm:text-4xl">{profile.name}</p>
            <p className="eyebrow mt-3 flex items-start gap-3">
              <span aria-hidden="true" className="mt-[0.4em] inline-block size-1.5 shrink-0 rounded-full bg-accent" />
              <span>
                <span className="block lg:inline">{role}</span>
                <span aria-hidden="true" className="hidden lg:inline"> | </span>
                <span className="sr-only lg:hidden">, </span>
                <span className="block lg:inline">{focus}</span>
              </span>
            </p>
          </div>

          <h1
            id="home-title"
            className="mt-12 font-serif text-[clamp(2.75rem,1rem+5vw,5.75rem)] leading-[0.96] tracking-[-0.02em] text-balance text-ink md:mt-auto md:pt-16"
          >
            {profile.headline.lead} <em className="text-accent">{profile.headline.accent}</em>
          </h1>

          <p className="mt-8 max-w-xl text-lede text-ink-soft">
            <span className="text-ink">I&apos;m Jamillah.</span> {profile.intro}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 text-sm font-medium text-on-accent transition-colors hover:bg-ink hover:text-paper"
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
      </div>

      <div className="mt-14 lg:mt-20">
        <h2 className="eyebrow mb-5">Evidence from the work</h2>
        <ul className="grid grid-cols-2 border-t border-ink lg:grid-cols-4">
          {proof.map((item, index) => (
            <li key={item.value} className={`border-line ${cellLayout[index]}`}>
              <a href={item.href} className="group flex h-full flex-col gap-3 py-5 sm:py-6 lg:py-8">
                <span className="flex items-start justify-between gap-4">
                  <span className="font-serif text-[2.5rem] leading-none tracking-tight text-ink sm:text-5xl lg:text-[3.5rem]">
                    {item.value}
                  </span>
                  <ArrowUpRight className="mt-1 hidden shrink-0 text-ink-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent sm:block" />
                </span>
                <span className="max-w-[26ch] text-sm leading-snug text-ink-soft sm:text-[0.9375rem]">{item.label}</span>
                <span className="mt-auto font-mono text-xs text-ink-faint">{item.source}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
