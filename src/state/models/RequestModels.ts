export type Fields =
  | "subject"
  | "grade"
  | "topic"
  | "difficulty"
  | "count"
  | "extraPrompt";

export interface RequestPrompt {
  subject: string;
  grade: number;
  topic: string;
  difficulty: string;
  count: number;
  extraPrompt: string;
}

// 0 is subject and so on...
export const StepToFieldMapping: Fields[] = [
  "subject",
  "grade",
  "topic",
  "difficulty",
  "count",
  "extraPrompt",
];

export type DifficultiesTypes = "Lengvi" | "Vidutiniai" | "Sunkūs" | "Maišyti";
export const Difficulties: DifficultiesTypes[] = [
  "Lengvi",
  "Vidutiniai",
  "Sunkūs",
  "Maišyti",
];
