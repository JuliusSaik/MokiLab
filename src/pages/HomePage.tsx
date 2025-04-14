import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { RequestPrompt } from "../state/models/RequestModels";
import { dummySubjects } from "../state/dummyData";
import SelectionCard from "../components/SelectionCard";

const HomePage = () => {
  //const { register } = useForm<RequestPrompt>();
  const [sliderStep, setSliderStep] = useState(1);

  const handleNextButton = () => {
    const nextStep = sliderStep + 1;
    setSliderStep(nextStep);
  };

  function handlePrevious(): void {
    if (sliderStep > 1) {
      setSliderStep(sliderStep - 1);
    }
  }
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <ul className="steps w-full my-16">
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
            <div className="flex gap-4">
              {dummySubjects.map((subject) => (
                <SelectionCard subject={subject} key={subject} />
              ))}
            </div>
          </div>
        )}

        {sliderStep === 2 && (
          <div className="text-center w-full">
            <h1 className="text-4xl font-bold text-purple-700 mb-8">
              Pasirinkite klasę, kuriai norite gauti užduotis
            </h1>
            <div className="grid grid-cols-2 gap-8 text-left">
              <div className="w-full">
                <h2 className="text-xl text-purple-700 mb-4">Progimnazija</h2>
                <div className="grid grid-cols-2 gap-4">
                  {Array.from({ length: 4 }, (_, i) => (
                    <button
                      key={`progimnazija-${i + 1}`}
                      className="class-selections"
                    >
                      {i + 1}kl.
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-xl text-purple-700 mb-4">Vidurinė</h2>
                <div className="grid grid-cols-2 gap-2">
                  {Array.from({ length: 4 }, (_, i) => (
                    <button
                      key={`vidurine-${i + 5}`}
                      className="class-selections"
                    >
                      {i + 5}kl.
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-xl text-purple-700 mb-4">Gimnazija</h2>
                <div className="grid grid-cols-2 gap-2">
                  {Array.from({ length: 4 }, (_, i) => (
                    <button
                      key={`gimnazija-${i + 9}`}
                      className="class-selections"
                    >
                      {i + 9}kl.
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {sliderStep === 3 && (
          <div className="text-center mt-8">
            <h1 className="text-2xl font-bold text-purple-700 mb-4">
              Pick a Topic
            </h1>
            <input
              type="text"
              placeholder="Search topics..."
              className="w-full p-3 mb-4 bg-purple-100 text-purple-700 font-semibold rounded-lg shadow-lg hover:shadow-xl focus:ring-2 focus:ring-purple-500 transition-all duration-300"
            />
            <select className="w-full p-3 bg-purple-100 text-purple-700 font-semibold rounded-lg shadow-lg hover:shadow-xl focus:ring-2 focus:ring-purple-500 transition-all duration-300">
              {["Vectors", "Geometry", "Logarithms", "Trigonometry"].map(
                (topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                )
              )}
            </select>
          </div>
        )}

        {sliderStep === 4 && (
          <div className="text-center mt-8">
            <h1 className="text-2xl font-bold text-purple-700 mb-4">
              Pick an Option
            </h1>
            <div className="grid grid-cols-2 gap-4">
              {["Easy", "Medium", "Hard", "Mixed"].map((option) => (
                <button
                  key={option}
                  className="p-4 bg-purple-100 text-purple-700 font-semibold rounded-lg shadow-lg hover:bg-purple-200 hover:scale-105 transition-transform duration-300"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Next Button */}
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
