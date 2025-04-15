import React, { useState } from "react";
import { set, useForm } from "react-hook-form";
import {
  DifficultiesTypes,
  RequestPrompt,
} from "../state/models/RequestModels";
import { dummySubjects } from "../state/dummyData";
import SelectionCard from "../components/SelectionCard";
import SearchableSelect from "../components/SearchableSelect";
import { MathTopics } from "../state/data";
import GradeSelector from "../components/GradeSelector";

const HomePage = () => {
  //const { register } = useForm<RequestPrompt>();
  const [sliderStep, setSliderStep] = useState(1);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [subjectTopics, setSubjectTopics] = useState<string[]>([]);
  const [selectedGrade, setSelectedGrade] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<DifficultiesTypes>("lengvi");

  const [extraPrompt, setExtraPrompt] = useState("");

  const handleNextButton = () => {
    const nextStep = sliderStep + 1;
    setSliderStep(nextStep);
  };

  const handlePrevious = () => {
    if (sliderStep > 1) {
      setSliderStep(sliderStep - 1);
    }
  };

  const handleSelectSubject = (subject: string) => {
    setSelectedSubject(subject);
    switch (subject) {
      case "Matematika":
        setSubjectTopics(MathTopics);
        break;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExtraPrompt(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <ul className="steps w-full my-8 text-white md:text-black">
        <li className="step step-primary">Dalykas</li>
        <li className={`step ${sliderStep >= 2 ? "step-primary" : ""}`}>
          Klasė
        </li>
        <li className={`step ${sliderStep >= 3 ? "step-primary" : ""} `}>
          Tema
        </li>
        <li className={`step ${sliderStep >= 4 ? "step-primary" : ""} `}>
          Sudėtingumas
        </li>
        <li className={`step ${sliderStep >= 5 ? "step-primary" : ""} `}>
          Aprašymas
        </li>
      </ul>

      <div className="w-full lg:w-1/2 flex flex-col">
        {sliderStep === 1 && (
          <div className="text-center w-full">
            <h1 className="text-4xl font-bold text-purple-700 mb-8">
              Pasirinkite mokomojąjį dalyką
            </h1>
            <div className="flex gap-8">
              {dummySubjects.map((subject) => (
                <SelectionCard
                  subject={subject}
                  key={subject}
                  handleSelectSubject={handleSelectSubject}
                  selectedSubject={selectedSubject}
                />
              ))}
            </div>
          </div>
        )}

        {sliderStep === 2 && (
          <div className="text-center w-full">
            <h1 className="text-4xl font-bold text-purple-700 mb-8">
              Pasirinkite klasę, kuriai norite gauti užduotis
            </h1>
            <GradeSelector
              selectedGrade={selectedGrade}
              setSelectedGrade={setSelectedGrade}
            />
          </div>
        )}

        {sliderStep === 3 && (
          <div className="text-center mt-8">
            <h1 className="text-4xl font-bold text-purple-700 mb-8">
              Pasirinkite dalyko temą
            </h1>
            <SearchableSelect
              options={subjectTopics}
              selectedTopic={selectedTopic}
              setSelectedTopic={setSelectedTopic}
            />
          </div>
        )}

        {sliderStep === 4 && (
          <div className="text-center mt-8">
            <h1 className="text-4xl font-bold text-purple-700 mb-8">
              Pasirinkite sudėtingumo lygį
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["Lengvi", "Vidutiniai", "Sunkūs", "Maišyti"].map((option) => (
                <div
                  className={`base-animation ${
                    selectedDifficulty === option.toLowerCase()
                      ? "difficulty-card-active"
                      : "difficulty-card"
                  }`}
                >
                  <div
                    className="h-16 text-lg flex items-center justify-center overflow-hidden"
                    key={option}
                    onClick={() => {
                      setSelectedDifficulty(
                        option.toLowerCase() as DifficultiesTypes
                      );
                    }}
                  >
                    {option}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {sliderStep === 5 && (
          <div className="text-center mt-8">
            <h1 className="text-4xl font-bold text-purple-700 mb-8">
              Pridėkite papildomus reikalavimus
            </h1>
            <div className="">
              <fieldset className="fieldset">
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
                    type="search"
                    placeholder={
                      extraPrompt ||
                      "Įrašykite papildomus reikalavimus, jeigu tokių turite"
                    }
                    className="px-2"
                    onChange={(e) => handleInputChange(e)}
                    value={extraPrompt}
                  />
                </label>
                <p className="fieldset-label">
                  Galite pridėti tokius reikalavimus, kaip "Duokite 20
                  uždavinių, padarykite tekstinius"
                </p>
              </fieldset>
            </div>
          </div>
        )}

        <div className="mt-32 text-center flex gap-8">
          <button
            className="w-full font-bold rounded-lg shadow-lg hover:bg-purple-200 hover:scale-105 transition-transform duration-300"
            onClick={() => handlePrevious()}
          >
            Atgal
          </button>
          <button
            className="w-full p-4 bg-purple-600 text-white font-bold rounded-lg shadow-lg hover:bg-purple-700 hover:scale-105 transition-transform duration-300"
            onClick={() => handleNextButton()}
          >
            Toliau
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
