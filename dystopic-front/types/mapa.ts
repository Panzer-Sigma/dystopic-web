/** Street colour used in the design's dashed highlights and the matching text. */
export type StreetTone = "orange" | "green" | "red";

/** Inline run of text; a `tone` marks a highlighted street name. */
export type TextRun = string | { text: string; tone: StreetTone };

/** A labelled block (ONDE PEGAR, HORÁRIO COMUM, …); later paragraphs continue it without a label. */
export interface DistrictSection {
  label: string;
  paragraphs: TextRun[][];
}

export interface District {
  slug: string;
  name: string;
  /** District map art from DESIGN, with the streets highlighted. */
  image: { src: string; width: number; height: number };
  sections: DistrictSection[];
  contacts?: { intro: string; items: string[] };
}
