import React from "react";

const SelectionCard: React.FC<{ subject: string }> = ({ subject }) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 max-w-[280px] w-full cursor-pointer hover:shadow-xl transition-shadow duration-300">
      <div className="mb-6 h-40 flex items-center justify-center overflow-hidden">
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
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{subject}</h3>
      </div>
    </div>
  );
};

export default SelectionCard;
