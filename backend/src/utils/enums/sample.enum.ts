export const SAMPLE_TYPES = [
  "DRUMS",
  "BASS",
  "MIDS",
  "HIGHS",
  "VOCALS",
] as const;

export type SampleType = (typeof SAMPLE_TYPES)[number];

export const SAMPLE_CATEGORIES = [
  "sample",
  "loop",
  "track or stem",
] as const;

export type SampleCategory = (typeof SAMPLE_CATEGORIES)[number];