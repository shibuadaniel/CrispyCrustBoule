import data from "@/docs/gf-trials/gf-trials.json";

export type TrialTone = "good" | "problem" | "pending";
export type TrialStatus = "up-next" | "current-best" | "past" | "baseline";

export type MetaPair = { label: string; value: string };
export type Change = { lead: string; text: string };
export type Photo = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};
export type IngredientRow =
  | { group: string; item?: never; note?: never; grams?: never; percent?: never; tag?: never; was?: never }
  | { note: string; group?: never; item?: never; grams?: never; percent?: never; tag?: never; was?: never }
  | {
      item: string;
      grams: string;
      percent: string;
      tag?: string;
      was?: string;
      group?: never;
      note?: never;
    };

export type MethodStep = {
  title: string;
  text: string;
  tag?: string;
  note?: string;
};

export type RecipeBlock = {
  title?: string;
  rows: IngredientRow[];
  steps?: MethodStep[];
  foot?: string;
};

export type Trial = {
  slug: string;
  version: string;
  date: string;
  dateLabel: string;
  status: TrialStatus;
  resultTag: string;
  tone: TrialTone;
  summary: string;
  meta: MetaPair[];
  changes?: Change[];
  intro?: string;
  why?: string;
  includes?: { label: string; text: string };
  result: string;
  photos: Photo[];
  photoNote?: string;
  starter?: RecipeBlock;
  ingredients: RecipeBlock;
  method: MethodStep[];
};

export const trials = data.trials as Trial[];

export const getTrial = (slug: string) => trials.find((t) => t.slug === slug);

export const getCurrentBest = () => trials.find((t) => t.status === "current-best");

export const getUpNext = () => trials.find((t) => t.status === "up-next");

export const statusLabel = (status: TrialStatus) => {
  switch (status) {
    case "up-next":
      return "Up next";
    case "current-best":
      return "Current best";
    case "baseline":
      return "Baseline";
    default:
      return "Past trial";
  }
};

export const cardFlag = (status: TrialStatus) => {
  switch (status) {
    case "up-next":
      return "Up next";
    case "current-best":
      return "Current best";
    case "baseline":
      return "Baseline";
    default:
      return null;
  }
};

/** Trials are newest-first. Neighbours for pager. */
export const getNeighbours = (slug: string) => {
  const index = trials.findIndex((t) => t.slug === slug);
  if (index < 0) return { newer: undefined, older: undefined };
  return {
    newer: index > 0 ? trials[index - 1] : undefined,
    older: index < trials.length - 1 ? trials[index + 1] : undefined,
  };
};

/** Immediate older version (next in newest-first list). */
export const getOlderTrial = (slug: string) => getNeighbours(slug).older;

export const allSlugs = () => trials.map((t) => t.slug);
