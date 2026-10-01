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
    <section aria-labelledby="contact-title" id="contact" className="bg-paper-sunk py-16 text-ink lg:py-24">
      <Reveal className="shell grid gap-12 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="eyebrow flex gap-3">
            <span className="text-green">05</span>
            <span>Contact</span>
          </p>
          <h2 id="contact-title" className="mt-5 max-w-[18ch] font-serif text-title font-medium tracking-tight text-balance">
            Building something that needs the backend, the interface and the deployment to agree?
          </h2>
        </div>

        <div className="lg:col-span-5">
          <a
            href={`mailto:${profile.email}`}
            className="block font-serif text-[clamp(1.5rem,0.5rem+2.4vw,2.75rem)] font-medium leading-tight tracking-tight [overflow-wrap:anywhere] transition-colors hover:text-accent"
          >
            {profile.email}
          </a>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-line-strong pt-6">
            <CopyEmail email={profile.email} />
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {channels.map((channel) => (
                <li key={channel.label}>
                  <a
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 text-ink-soft transition-colors hover:text-ink"
                  >
                    {channel.label}
                    <ArrowUpRight className="text-ink-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
