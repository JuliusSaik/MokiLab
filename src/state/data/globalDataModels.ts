export interface Subtopic {
  subtopicName: string;
  exampleProblems: string;
}

export interface Topic {
  topicName: string;
  subtopics: Subtopic[];
}
