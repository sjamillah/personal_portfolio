export const profile = {
  name: "Jamillah Ssozi",
  title: "Software Engineer | Backend, Full-Stack & AI",
  location: "Kigali, Rwanda",
  email: "ssozijamillah@gmail.com",
  siteUrl: "https://jamillah-ssozi.netlify.app",
  greeting: "Hi, I’m Jamillah.",
  headline: {
    lead: "I build software from the database schema",
    accent: "to the screen reader.",
  },
  intro:
    "I develop and ship complete web and mobile applications across backend, frontend and cloud, with Python, TypeScript and AWS at the core and machine learning where it earns its place.",
  description:
    "Jamillah Ssozi is a software engineer working across Python backend systems, full-stack web and mobile applications, AI/ML, cloud deployment and accessible product engineering.",
  links: {
    github: "https://github.com/sjamillah",
    linkedin: "https://www.linkedin.com/in/jamillah-ssozi",
    medium: "https://medium.com/@jamillahssozi",
    cv: "https://docs.google.com/document/d/1o6vr30Sr38HLNJ1tgobDeN42uls71GY0_d3hC1YAvbE/edit?usp=sharing",
  },
} as const;

export const navigation = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;

export const proof = [
  {
    value: "55/58",
    label: "Accessibility issues resolved on the ARMS app at AmaliTech",
    source: "AmaliTech",
    href: "/#experience",
  },
  {
    value: "95.4%",
    label: "Accuracy classifying candidate skillsets to job roles at ThinkGreen Afrika",
    source: "ThinkGreen Afrika",
    href: "/#experience",
  },
  {
    value: "137+",
    label: "Automated tests across the Aureynx conservation platform",
    source: "Aureynx",
    href: "/projects/aureynx",
  },
  {
    value: "2nd · 3rd",
    label: "Hackathon placements for clinical microscopy AI, at Codextreme 2025 and HSIL 2026",
    source: "Codextreme 2025 · HSIL 2026",
    href: "/projects/clinical-microscopy",
  },
] as const;

export const principles = [
  {
    title: "Own the whole path",
    body: "Decisions in one layer are made knowing what the next one needs, whether that is an API shape, a schema or a deploy step.",
  },
  {
    title: "Tests are part of the design",
    body: "Test-driven development and automated checks decide what is allowed to ship, not a review at the end.",
  },
  {
    title: "Accessible by default",
    body: "Screen readers, large text and tablet layouts are requirements from the first screen, and tests keep them that way.",
  },
  {
    title: "Models earn their place",
    body: "Machine learning is trained, evaluated and served behind an API, as a feature of a product rather than a notebook.",
  },
] as const;
