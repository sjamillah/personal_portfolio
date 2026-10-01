export const profile = {
  name: "Jamillah Ssozi",
  title: "Software Engineer | Backend, Full-Stack & AI",
  location: "Kigali, Rwanda",
  email: "ssozijamillah@gmail.com",
  siteUrl: "https://jamillah-ssozi.netlify.app",
  headline: {
    lead: "From the database schema",
    accent: "to the screen reader.",
  },
  intro:
    "I develop and ship complete web and mobile applications across backend, frontend and cloud, with experience in Python, TypeScript, React, Flutter, Django REST, FastAPI, Node.js, Docker, AWS and machine learning.",
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
    label: "Accessibility issues resolved on the ARMS app",
    source: "AmaliTech",
    href: "/#experience",
  },
  {
    value: "95.4%",
    label: "Accuracy classifying candidate skillsets to job roles",
    source: "ThinkGreen Afrika",
    href: "/#experience",
  },
  {
    value: "137+",
    label: "Automated tests across the Aureynx platform",
    source: "Aureynx",
    href: "/projects/aureynx",
  },
  {
    value: "2nd · 3rd",
    label: "Hackathon placements for clinical microscopy AI",
    source: "Codextreme 2025 · HSIL 2026",
    href: "/projects/clinical-microscopy",
  },
] as const;

export const layers = [
  {
    name: "Data",
    work: "Relational and document schemas, caching, and dataset preprocessing and validation for models.",
    evidence: ["Aureynx", "Darkroom", "Clinical Microscopy"],
  },
  {
    name: "Backend & APIs",
    work: "Django REST, FastAPI and NestJS services with authentication, WebSockets and asynchronous scraping.",
    evidence: ["InsightFlow at AmaliTech", "Aureynx", "Chronic Disease"],
  },
  {
    name: "Machine learning",
    work: "End-to-end pipelines: preprocessing, training, hyperparameter tuning, evaluation and served inference.",
    evidence: ["ThinkGreen Afrika", "Medical Q&A", "Clinical Microscopy"],
  },
  {
    name: "Interfaces",
    work: "React dashboards, an offline-first React Native app and Flutter clients built against real APIs.",
    evidence: ["Aureynx", "Chronic Disease", "The Gym Rwanda"],
  },
  {
    name: "Delivery & cloud",
    work: "Docker, GitHub Actions with OIDC, CodePipeline and CodeDeploy onto ECS Fargate, all in CloudFormation.",
    evidence: ["Darkroom"],
  },
  {
    name: "Accessibility",
    work: "WCAG 2.2 audits with TalkBack and VoiceOver, large font scales, tablet layouts and guard tests.",
    evidence: ["ARMS at AmaliTech"],
  },
] as const;
