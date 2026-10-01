export type Link = {
  label: string;
  href: string;
};

export type DiagramNode = {
  id: string;
  x: number;
  y: number;
  w: number;
  h?: number;
  label: string;
  meta?: string;
  tone?: "default" | "accent" | "muted";
};

export type DiagramEdge = {
  id: string;
  from: string;
  to: string;
  points: [number, number][];
  label?: string;
  labelAt?: [number, number];
  dashed?: boolean;
  arrow?: boolean;
};

export type DiagramSpec = {
  title: string;
  description: string;
  width: number;
  height: number;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
};

export type Metric = {
  value: string;
  label: string;
};

export type Award = {
  place: string;
  event: string;
  year: string;
};

export type DetailItem = {
  title: string;
  body: string;
};

export type TechGroup = {
  label: string;
  items: string[];
};

export type Project = {
  slug: string;
  index: string;
  name: string;
  kind: string;
  domain: string;
  summary: string;
  tagline: string;
  code: "public" | "private";
  links: Link[];
  metrics: Metric[];
  awards?: Award[];
  focus: string;
  problem: string[];
  approach: DetailItem[];
  architecture: {
    intro: string;
    diagram: DiagramSpec;
  };
  implementation: DetailItem[];
  challenges: DetailItem[];
  results: string[];
  technologies: TechGroup[];
};

export type Workstream = {
  name: string;
  area: string;
  points: string[];
};

export type Role = {
  id: string;
  title: string;
  org: string;
  start: string;
  end: string;
  startISO: string;
  endISO: string;
  summary: string;
  workstreams: Workstream[];
  metrics?: Metric[];
};

export type SkillCategory = {
  name: string;
  items: string[];
  evidence: Link[];
};

export type SkillBand = {
  name: string;
  note: string;
  categories: SkillCategory[];
};

export type Certification = {
  name: string;
  issuer: string;
  date: string;
};
