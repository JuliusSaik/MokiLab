export interface RequestPrompt {
  subject: string;
  grade: number;
  topic: string;
  difficulty: string;
  detailedTopicPrompt: string;
}

export type DifficultiesTypes = "lengvi" | "vidutiniai" | "sunkūs" | "maišyti";
