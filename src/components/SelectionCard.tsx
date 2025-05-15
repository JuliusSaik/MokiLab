import React from "react";
import { UseFormWatch } from "react-hook-form";
import { RequestPrompt } from "../state/models/RequestModels";

interface SelectionCardProps {
  subject: string;
  handleSelectSubject: (subject: string) => void;
  watch: UseFormWatch<RequestPrompt>;
}

const SelectionCard: React.FC<SelectionCardProps> = ({
  subject,
  handleSelectSubject,
  watch,
}) => {
  const selectedSubject = watch("subject");

  return (
    <div
      className={`base-animation ${
        selectedSubject === subject ? "subject-card-active" : "subject-card"
      }`}
      onClick={() => handleSelectSubject(subject)}
    >
      <div className="mb-6 h-20 md:h-40 flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect
            x="35"
            y="30"
            width="55"
            height="25"
            rx="5"
            ry="5"
            fill="#E9D5FF"
          />{" "}
          <rect
            x="45"
            y="58"
            width="45"
            height="20"
            rx="3"
            ry="3"
            fill="#FEF08A"
          />{" "}
          <circle cx="50" cy="68" r="3" fill="#374151" />{" "}
          <rect x="56" y="65" width="30" height="2" fill="#E5E7EB" />{" "}
          <rect x="56" y="70" width="30" height="2" fill="#E5E7EB" />{" "}
          <circle cx="30" cy="45" r="25" fill="#FACC15" />{" "}
          <path
            d="M 15 40 Q 30 30 45 45"
            stroke="#A16207"
            stroke-width="1.5"
            fill="none"
          />
          <path
            d="M 20 55 Q 35 50 40 60"
            stroke="#A16207"
            stroke-width="1.5"
            fill="none"
          />
          <polygon points="30,5 50,25 10,25" fill="#BEF264" />
        </svg>
      </div>

      <div className="text-left">
        <h3 className="text-lg font-semibold text-stone-300 mb-1 justify-center flex items-center">
          {subject}
        </h3>
      </div>
    </div>
  );
};

export default SelectionCard;
