import { profile } from "@/content/profile";
import { CopyEmail } from "@/components/copy-email";
import { ArrowUpRight } from "@/components/icons";
import { Reveal } from "@/components/reveal";

const channels = [
  { label: "LinkedIn", href: profile.links.linkedin },
  { label: "GitHub", href: profile.links.github },
  { label: "Medium", href: profile.links.medium },
  { label: "CV", href: profile.links.cv },
];

export function Contact() {
  return (
    <section aria-labelledby="contact-title" id="contact" className="night bg-paper py-24 text-ink lg:py-36">
      <div className="shell">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-ink-faint">
            <span className="text-lavender">05</span>&nbsp;&nbsp;&nbsp;Contact
          </p>
          <h2 id="contact-title" className="mt-8 max-w-[16ch] font-serif text-title tracking-tight text-balance">
            Building something that needs the backend, the interface and the deployment to agree?
          </h2>
        </Reveal>

        <Reveal className="mt-14 lg:mt-20">
          <div className="flex flex-col gap-4 border-y border-line-strong py-8 sm:flex-row sm:items-center sm:justify-between">
            <a
              href={`mailto:${profile.email}`}
              className="font-serif text-[clamp(1.6rem,1rem+3.4vw,4.25rem)] leading-none tracking-tight break-all transition-colors hover:text-accent sm:break-normal"
            >
              {profile.email}
            </a>
            <CopyEmail email={profile.email} />
          </div>

          <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
            <ul className="flex flex-wrap gap-x-8 gap-y-3 lg:col-span-8">
              {channels.map((channel) => (
                <li key={channel.label}>
                  <a
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-lg text-ink-soft transition-colors hover:text-ink"
                  >
                    {channel.label}
                    <ArrowUpRight className="text-ink-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="font-mono text-sm text-ink-faint sm:text-right lg:col-span-4">{profile.location}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
