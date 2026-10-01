import type { Role } from "@/lib/types";

export const experience: Role[] = [
  {
    id: "amalitech",
    title: "Python Backend & AI Apprentice",
    org: "AmaliTech",
    start: "Mar 2026",
    end: "Sep 2026",
    startISO: "2026-03",
    endISO: "2026-09",
    summary:
      "Two products and two kinds of engineering: backend services in Python, and making a mobile app usable by everyone.",
    workstreams: [
      {
        name: "InsightFlow",
        area: "Python backend",
        points: [
          "Built Python backend services using test-driven development, Git Flow and SOLID principles.",
          "Implemented asynchronous web scraping, log analysis and user authentication.",
        ],
      },
      {
        name: "ARMS",
        area: "Accessibility",
        points: [
          "Audited and fixed the app against WCAG 2.2, testing every change with TalkBack and VoiceOver.",
          "Tested on device across 44 screens, including large font scales and responsive tablet layouts, and added automated guard tests so fixed issues stay fixed.",
        ],
      },
    ],
    metrics: [
      { value: "55/58", label: "accessibility issues resolved" },
      { value: "44", label: "screens tested on device" },
    ],
  },
  {
    id: "the-gym",
    title: "Software Development Trainee",
    org: "The Gym Rwanda",
    start: "Nov 2024",
    end: "Dec 2025",
    startISO: "2024-11",
    endISO: "2025-12",
    summary:
      "Over a year of building features and reviewing other people's code in a Git-based team workflow.",
    workstreams: [
      {
        name: "Full-stack development",
        area: "TypeScript",
        points: [
          "Built full-stack features in TypeScript with Node.js, NestJS, React and SQL.",
          "Reviewed peers' code to identify bugs, edge cases and logic gaps.",
          "Worked in a Git-based branching and code review workflow.",
        ],
      },
    ],
  },
  {
    id: "thinkgreen",
    title: "AI & Machine Learning Intern",
    org: "ThinkGreen Afrika",
    start: "Oct 2025",
    end: "Dec 2025",
    startISO: "2025-10",
    endISO: "2025-12",
    summary:
      "An end-to-end machine learning pipeline classifying candidate skillsets to job roles.",
    workstreams: [
      {
        name: "Skillset classification",
        area: "Machine learning",
        points: [
          "Data preprocessing, training, hyperparameter tuning and evaluation.",
        ],
      },
    ],
    metrics: [
      { value: "95.4%", label: "classification accuracy" },
      { value: "0.15", label: "validation loss" },
    ],
  },
];
