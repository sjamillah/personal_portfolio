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
      "Backend services for InsightFlow and accessibility engineering on the ARMS mobile app, built with test-driven development throughout.",
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
          "Audited and fixed the app against WCAG 2.2 with TalkBack and VoiceOver, resolving 55 of 58 accessibility issues.",
          "Wrote automated accessibility guard tests so resolved issues are caught if they return.",
          "Tested on device across 44 screens, including large font scales, and built responsive tablet layouts.",
        ],
      },
    ],
    metrics: [
      { value: "55/58", label: "accessibility issues resolved" },
      { value: "44", label: "screens tested on device" },
    ],
    stack: ["Python", "TDD", "Git Flow", "SOLID", "WCAG 2.2", "TalkBack", "VoiceOver"],
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
      "Full-stack development in TypeScript, with peer code review as a core part of the work.",
    workstreams: [
      {
        name: "Full-stack",
        area: "Development",
        points: [
          "Built full-stack features in TypeScript with Node.js, NestJS, React and SQL.",
          "Worked in a Git-based branching and code review workflow.",
        ],
      },
      {
        name: "Code review",
        area: "Quality",
        points: [
          "Reviewed peers' code to identify bugs, edge cases and logic gaps.",
        ],
      },
    ],
    stack: ["TypeScript", "Node.js", "NestJS", "React", "SQL", "Git"],
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
          "Built the pipeline end to end: data preprocessing, training, hyperparameter tuning and evaluation.",
          "Reached 95.4% accuracy with a validation loss of 0.15.",
        ],
      },
    ],
    metrics: [
      { value: "95.4%", label: "classification accuracy" },
      { value: "0.15", label: "validation loss" },
    ],
    stack: ["Python", "Machine learning", "Hyperparameter tuning", "Evaluation"],
  },
];
