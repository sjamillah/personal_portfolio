import { About } from "@/components/home/about";
import { Contact } from "@/components/home/contact";
import { Experience } from "@/components/home/experience";
import { Hero } from "@/components/home/hero";
import { Projects } from "@/components/home/projects";
import { Skills } from "@/components/home/skills";
import { profile } from "@/content/profile";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  email: `mailto:${profile.email}`,
  url: profile.siteUrl,
  address: { "@type": "PostalAddress", addressLocality: "Kigali", addressCountry: "RW" },
  sameAs: [profile.links.github, profile.links.linkedin, profile.links.medium],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
    </>
  );
}
