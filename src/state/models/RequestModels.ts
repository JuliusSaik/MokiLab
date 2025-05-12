export type Fields =
  | "subject"
  | "grade"
  | "topic"
  | "difficulty"
  | "detailedTopicPrompt";

export interface RequestPrompt {
  subject: string;
  grade: number;
  topic: string;
  difficulty: string;
  detailedTopicPrompt: string;
}

// 0 is subject and so on...
export const StepToFieldMapping: Fields[] = [
  "subject",
  "grade",
  "topic",
  "difficulty",
  "detailedTopicPrompt",
];

export type DifficultiesTypes = "lengvi" | "vidutiniai" | "sunkūs" | "maišyti";
export const Difficulties: DifficultiesTypes[] = [
  "lengvi",
  "vidutiniai",
  "sunkūs",
  "maišyti",
];
