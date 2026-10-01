import type { Certification, SkillBand } from "@/lib/types";

const work = {
  darkroom: { label: "Darkroom", href: "/projects/darkroom" },
  aureynx: { label: "Aureynx", href: "/projects/aureynx" },
  chronic: { label: "Chronic Disease", href: "/projects/chronic-disease" },
  medicalQa: { label: "Medical Q&A", href: "/projects/medical-qa" },
  microscopy: { label: "Clinical Microscopy", href: "/projects/clinical-microscopy" },
  amalitech: { label: "AmaliTech", href: "/#experience" },
  gym: { label: "The Gym Rwanda", href: "/#experience" },
  thinkgreen: { label: "ThinkGreen Afrika", href: "/#experience" },
};

export const skillBands: SkillBand[] = [
  {
    name: "Build",
    categories: [
      {
        name: "Languages",
        items: ["Python", "JavaScript", "TypeScript", "SQL", "Dart", "Shell"],
        evidence: [],
      },
      {
        name: "Backend & APIs",
        items: [
          "Django REST Framework",
          "FastAPI",
          "Flask",
          "Node.js",
          "NestJS",
          "REST APIs",
          "WebSockets",
        ],
        evidence: [work.aureynx, work.chronic, work.darkroom, work.gym],
      },
      {
        name: "Frontend & Mobile",
        items: ["React", "Next.js", "React Native", "Flutter"],
        evidence: [work.aureynx, work.chronic, work.gym],
      },
    ],
  },
  {
    name: "Data & AI",
    categories: [
      {
        name: "Databases",
        items: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
        evidence: [work.darkroom, work.aureynx, work.chronic],
      },
      {
        name: "Machine Learning",
        items: [
          "TensorFlow",
          "PyTorch",
          "scikit-learn",
          "Hugging Face Transformers",
          "XGBoost",
          "CNNs",
          "LSTMs",
          "Reinforcement learning",
        ],
        evidence: [work.thinkgreen, work.aureynx, work.medicalQa, work.microscopy],
      },
      {
        name: "LLM & GenAI",
        items: [
          "RAG pipelines",
          "LangChain",
          "Embeddings",
          "Vector databases",
          "pgvector",
          "Qdrant",
        ],
        evidence: [],
      },
    ],
  },
  {
    name: "Ship",
    categories: [
      {
        name: "Cloud & DevOps",
        items: [
          "AWS",
          "ECS Fargate",
          "ECR",
          "S3",
          "RDS",
          "CloudFront",
          "IAM",
          "Secrets Manager",
          "CloudFormation",
          "CodePipeline",
          "CodeDeploy",
          "Docker",
          "GitHub Actions",
          "CI/CD",
        ],
        evidence: [work.darkroom],
      },
      {
        name: "Accessibility",
        items: [
          "WCAG 2.2",
          "TalkBack",
          "VoiceOver",
          "Screen-reader semantics",
          "Responsive & adaptive layouts",
          "Figma-to-code fidelity",
        ],
        evidence: [work.amalitech],
      },
      {
        name: "Engineering",
        items: [
          "Unit testing",
          "Integration testing",
          "Test-driven development",
          "Debugging",
          "Code review",
          "Git Flow",
          "SOLID principles",
        ],
        evidence: [work.amalitech, work.gym, work.aureynx],
      },
    ],
  },
];

export const certifications: Certification[] = [
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "Aug 2026",
  },
];

export const training: Certification[] = [
  {
    name: "Full-Stack Developer",
    issuer: "The Gym Rwanda",
    date: "Nov 2024 – Dec 2025",
  },
  {
    name: "Data Science Short Course",
    issuer: "Stanford University, hosted in Rwanda",
    date: "Sep 2023",
  },
  {
    name: "UI/UX Design Short Course",
    issuer: "Friends of Figma, Africa",
    date: "Sep 2023 – Dec 2023",
  },
];
