import React from "react";

export interface GradeSelectorProps {
  selectedGrade: number;
  setSelectedGrade: React.Dispatch<React.SetStateAction<number>>;
}

const GradeSelector: React.FC<GradeSelectorProps> = ({
  selectedGrade,
  setSelectedGrade,
}) => {
  return (
    <div className="grid md:grid-cols-2 gap-8 text-left">
      <div className="w-full">
        <h2 className="text-xl text-purple-700 mb-4">Progimnazija</h2>
        <div className="grid grid-cols-2 gap-6">
          {Array.from({ length: 4 }, (_, i) => (
            <button
              key={`progimnazija-${i + 1}`}
              className={`class-selections base-animation ${
                selectedGrade === i + 1 ? "scale-105 bg-purple-200" : ""
              }`}
              onClick={() => setSelectedGrade(i + 1)}
            >
              {i + 1}kl.
            </button>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-xl text-purple-700 mb-4">Vidurinė</h2>
        <div className="grid grid-cols-2 gap-6">
          {Array.from({ length: 4 }, (_, i) => (
            <button
              key={`vidurine-${i + 5}`}
              className={`class-selections base-animation ${
                selectedGrade === i + 5 ? "scale-105 bg-purple-200" : ""
              }`}
              onClick={() => setSelectedGrade(i + 5)}
            >
              {i + 5}kl.
            </button>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-xl text-purple-700 mb-4">Gimnazija</h2>
        <div className="grid grid-cols-2 gap-6">
          {Array.from({ length: 4 }, (_, i) => (
            <button
              key={`gimnazija-${i + 9}`}
              className={`class-selections base-animation ${
                selectedGrade === i + 9 ? "scale-105 bg-purple-200" : ""
              }`}
              onClick={() => setSelectedGrade(i + 9)}
            >
              {i + 9}kl.
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GradeSelector;
