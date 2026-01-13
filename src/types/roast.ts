export interface RoastTruth {
  number: string;
  title: string;
  content: string;
}

export interface RoastTension {
  left: { title: string; description: string };
  right: { title: string; description: string };
}

export interface RoastTheme {
  accent: string;
  accentDark: string;
  background: string;
  backgroundAlt: string;
}

export interface Roast {
  slug: string;
  client: string;
  documentType: string;
  date: string;
  theme: RoastTheme;
  heroTitle: {
    line1: string;
    emphasis: string;
    line2: string;
  };
  surfaceRead: string;
  unspokenInsecurity: string;
  truths: RoastTruth[];
  insight: string;
  tension: RoastTension;
  realProblem: {
    headline: string;
    subtext: string;
  };
  questionAvoiding: string;
  wayThrough: {
    headline: string;
    body: string;
    questions: string[];
  };
}
