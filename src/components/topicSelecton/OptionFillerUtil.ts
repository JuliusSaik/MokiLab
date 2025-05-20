import { Topic } from "../../state/data/globalDataModels";

/*
 RULES: 
  all data for grades of specific topics must follow syntax topic_{subject name} for the folder names
  all files for specific grades must follow syntax data_grade_{grade number} for the file names
  all arrays of topics must follow syntax topics_{subject name}_Grade_{grade number} for the array names
*/
export const getListOfTopics = async (
  subject: string,
  grade: number
): Promise<Topic[]> => {
  const path = `../../state/data/topic_${subject.toLowerCase()}/data_grade_${grade}.ts`;
  try {
    const module = await import(path);
    if (!module) {
      console.error(`Module not found at ${path}`);
      return [];
    }

    console.log("Object keys of found module:", Object.keys(module));

    const key = Object.keys(module).find(
      (variableName) =>
        variableName.startsWith("topics_") &&
        variableName.includes(`Grade_${grade}`)
    );

    if (key && module[key]) {
      return module[key] as Topic[];
    } else {
      console.error(`Could not find a topic list in ${path}`);
      return [];
    }
  } catch (error) {
    console.error(`Error loading topics from ${path}:`, error);
    return [];
  }
};

export default getListOfTopics;
