import React, { useEffect, useRef, useState } from "react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { Subtopic, Topic } from "../../state/data/globalDataModels";
import { RequestPrompt } from "../../state/models/RequestModels";
import getListOfTopics from "./OptionFillerUtil";

interface SearchableSelectProps {
  watch: UseFormWatch<RequestPrompt>;
  setValue: UseFormSetValue<RequestPrompt>;
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({
  watch,
  setValue,
}) => {
  const selectedTopic = watch("topic");
  const selectedSubtopic = watch("subtopic");
  const selectedGrade = watch("grade");
  const selectedSubject = watch("subject");

  const [isTopicSearchOpen, setIsTopicSearchOpen] = useState(false);
  const [isSubtopicSearchOpen, setIsSubtopicSearchOpen] = useState(false);
  const [topicSearchTerm, setTopicSearchTerm] = useState("");
  const [subtopicSearchTerm, setSubtopicSearchTerm] = useState("");

  const [data, setData] = useState<Topic[]>([]);
  const [filteredTopics, setFilteredTopics] = useState<Topic[]>([]);

  const [subtopicData, setSubtopicData] = useState<Subtopic[]>([]);
  const [filteredSubtopics, setFilteredSubtopics] = useState<Subtopic[]>([]);

  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedGrade && selectedSubject) {
        const topics = await getListOfTopics(selectedSubject, selectedGrade);
        console.log("Fetched topics:", topics);
        setData(topics);
      }
    };
    fetchData();
  }, [selectedGrade, selectedSubject]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !(inputRef.current as HTMLElement).contains(event.target as Node) &&
        dropdownRef.current &&
        !(dropdownRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setIsTopicSearchOpen(false);
        setIsSubtopicSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (data !== undefined) {
      const newFilteredTopics = data.filter((topic) =>
        topic.topicName.toLowerCase().includes(topicSearchTerm.toLowerCase())
      );
      setFilteredTopics(newFilteredTopics);
    }
  }, [topicSearchTerm, data]);

  useEffect(() => {
    const newFilteredSubtopics = subtopicData.filter((subtopic) =>
      subtopic.subtopicName
        .toLowerCase()
        .includes(subtopicSearchTerm.toLowerCase())
    );
    setFilteredSubtopics(newFilteredSubtopics);
  }, [subtopicSearchTerm, subtopicData]);

  const handleTopicInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setTopicSearchTerm(event.target.value);
    setIsTopicSearchOpen(true);
  };

  const handleTopicSelect = (selectedTopic: string) => {
    setValue("topic", selectedTopic);
    setTopicSearchTerm(selectedTopic);
    setIsTopicSearchOpen(false);

    const subtopics = data.find(
      (topic) => topic.topicName.toLowerCase() === selectedTopic.toLowerCase()
    )?.subtopics;
    if (subtopics) {
      setSubtopicData(subtopics);
    }
  };

  const handleSubtopicInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSubtopicSearchTerm(event.target.value);
    setIsSubtopicSearchOpen(true);
    setIsTopicSearchOpen(false);
  };

  const handleSubtopicSelect = (selectedSubtopic: string) => {
    setValue("subtopic", selectedSubtopic);
    setIsSubtopicSearchOpen(false);
    setSubtopicSearchTerm(selectedSubtopic);
  };

  return (
    <div className="relative w-full mb-4">
      <div className="text-lg text-left mb-2">
        {selectedTopic
          ? `Jūsų pasirinkta tema: ${selectedTopic}`
          : "Dar nesate pasirinkę temos"}
      </div>

      <div id="topicSearch" className="w-full">
        <label className="input h-16 w-full rounded-xl shadow-sm hover:shadow-xl transition-all duration-300">
          <svg
            className="h-[1em] opacity-85"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>

          <input
            ref={inputRef}
            type="search"
            placeholder={
              "Paspauskite čia arba rašykite, kad surastumėte temą..."
            }
            className="px-2"
            onClick={() => setIsTopicSearchOpen(true)}
            onChange={(e) => handleTopicInputChange(e)}
            value={topicSearchTerm ? topicSearchTerm : selectedTopic}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-chevron-down"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </label>

        {isTopicSearchOpen && filteredTopics.length > 0 && (
          <ul
            ref={dropdownRef}
            className="absolute z-10 mt-1 w-full bg-base-100 shadow-lg rounded-box overflow-y-auto max-h-48"
          >
            {filteredTopics.map((topic) => (
              <li key={topic.topicName} className="">
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-base-200 focus:outline-none animation-base"
                  onClick={() => handleTopicSelect(topic.topicName)}
                >
                  {topic.topicName}
                </button>
              </li>
            ))}
          </ul>
        )}
        {isTopicSearchOpen && data.length === 0 && topicSearchTerm && (
          <div className="absolute z-10 mt-1 w-full bg-base-100 shadow-lg rounded-box px-4 py-2">
            Tokių temų nėrasta
          </div>
        )}
      </div>

      {filteredSubtopics.length > 0 && (
        <div id="subtopicSearch" className="w-full mt-8 ">
          <div className="text-lg text-left mb-2">
            {selectedSubtopic
              ? `Jūsų pasirinkta potemė: ${selectedSubtopic}`
              : "Dar nesate pasirinkę potemės"}
          </div>

          <label className="input h-16 w-full rounded-xl shadow-sm hover:shadow-xl transition-all duration-300">
            <svg
              className="h-[1em] opacity-85"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>

            <input
              ref={inputRef}
              type="search"
              placeholder={
                selectedSubtopic ||
                "Paspauskite čia arba rašykite, kad surastumėte temą..."
              }
              className="px-2"
              onClick={() => setIsSubtopicSearchOpen(true)}
              onChange={(e) => handleSubtopicInputChange(e)}
              value={subtopicSearchTerm ? subtopicSearchTerm : selectedSubtopic}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-chevron-down"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </label>

          {isSubtopicSearchOpen &&
            !isTopicSearchOpen &&
            filteredSubtopics.length > 0 && (
              <ul
                ref={dropdownRef}
                className="absolute z-10 mt-1 w-full bg-base-100 shadow-lg rounded-box overflow-y-auto max-h-48"
              >
                {filteredSubtopics.map((subtopic) => (
                  <li key={subtopic.subtopicName} className="">
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-base-200 focus:outline-none animation-base"
                      onClick={() =>
                        handleSubtopicSelect(subtopic.subtopicName)
                      }
                    >
                      {subtopic.subtopicName}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          {isSubtopicSearchOpen &&
            filteredSubtopics.length === 0 &&
            subtopicSearchTerm && (
              <div className="absolute z-10 mt-1 w-full bg-base-100 shadow-lg rounded-box px-4 py-2">
                Tokių potemių nėrasta
              </div>
            )}
        </div>
      )}
    </div>
  );
};

export default SearchableSelect;
