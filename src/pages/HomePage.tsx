import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Difficulties,
  RequestPrompt,
  StepToFieldMapping,
} from "../state/models/RequestModels";
import { subjects } from "../state/data/subjectsData/subjects";
import SelectionCard from "../components/SelectionCard";
import SearchableSelect from "../components/topicSelecton/SearchableSelect";
import GradeSelector from "../components/GradeSelector";
import CountSelector from "../components/CountSelector";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { promptSchema } from "../state/validation/RequestResolver";
import StepSlider from "../components/StepSlider";

const HomePage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = useForm<RequestPrompt>({
    resolver: yupResolver(promptSchema),
    defaultValues: {
      count: 2,
    },
  });

  const [sliderStep, setSliderStep] = useState(1);
  const navigate = useNavigate();

  const handleNextButton = async () => {
    const fieldToValidate = StepToFieldMapping[sliderStep - 1];
    const isValid = await trigger(fieldToValidate);

    if (isValid) {
      const nextStep = sliderStep + 1;
      if (nextStep > 6) {
        handleSubmit(onSubmit)();
      } else {
        setSliderStep(nextStep);
      }
    }
  };

  const handlePrevious = () => {
    if (sliderStep > 1) {
      setSliderStep(sliderStep - 1);
    }
  };

  const handleSelectSubject = (subject: string) => {
    setValue("subject", subject);
  };

  const onSubmit = (data: RequestPrompt) => {
    const { subject, grade, topic, subtopic, difficulty, count, extraPrompt } =
      data;
    navigate("/results", {
      state: {
        subject,
        grade,
        topic,
        subtopic,
        difficulty,
        count,
        extraPrompt,
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <StepSlider sliderStep={sliderStep} />
      <div className="w-full lg:w-1/2 flex flex-col">
        {sliderStep === 1 && (
          <div className="text-center w-full">
            <h1 className="text-4xl font-bold text-stone-300 mb-8">
              Pasirinkite mokomojąjį dalyką
            </h1>
            <div className="flex flex-wrap justify-center gap-8">
              {subjects.map((subject) => (
                <SelectionCard
                  subject={subject}
                  key={subject}
                  handleSelectSubject={handleSelectSubject}
                  watch={watch}
                />
              ))}
            </div>
            <p className="text-error mt-8 text-lg">{errors.subject?.message}</p>
          </div>
        )}

        {sliderStep === 2 && (
          <div className="text-center w-full">
            <h1 className="text-4xl font-bold text-stone-300 mb-8">
              Pasirinkite klasę, kuriai norite gauti užduotis
            </h1>
            <GradeSelector setValue={setValue} watch={watch} />
            <p className="text-error mt-8 text-lg">{errors.grade?.message}</p>
          </div>
        )}

        {sliderStep === 3 && (
          <div className="text-center mt-8">
            <h1 className="text-4xl font-bold text-stone-300 mb-8">
              Pasirinkite dalyko temą
            </h1>
            <SearchableSelect watch={watch} setValue={setValue} />
            <p className="text-error mt-8 text-lg">{errors.topic?.message}</p>
          </div>
        )}

        {sliderStep === 4 && (
          <div className="text-center mt-8">
            <h1 className="text-4xl font-bold text-stone-300 mb-8">
              Pasirinkite sudėtingumo lygį
            </h1>
            <div className="grid grid-cols-2 text-secondary md:grid-cols-4 gap-4">
              {Difficulties.map((option) => (
                <div
                  className={`base-animation ${
                    watch("difficulty") === option.toLowerCase()
                      ? "difficulty-card-active"
                      : "difficulty-card"
                  }`}
                >
                  <div
                    className="h-16 text-lg flex items-center justify-center overflow-hidden"
                    key={option}
                    onClick={() => {
                      setValue("difficulty", option.toLowerCase());
                    }}
                  >
                    {option}
                  </div>
                </div>
              ))}
              <p className="text-error mt-8 text-lg">
                {errors.difficulty?.message}
              </p>
            </div>
          </div>
        )}

        {sliderStep === 5 && (
          <div className="text-center mt-8">
            <h1 className="text-4xl font-bold text-stone-300 mb-8">
              Pasirinkite kiek norėsite sukurti uždavinių
            </h1>
            <CountSelector watch={watch} setValue={setValue} />
            <p className="text-error mt-8 text-lg">{errors.count?.message}</p>
          </div>
        )}

        {sliderStep === 6 && (
          <div className="text-center mt-8">
            <h1 className="text-4xl font-bold text-stone-300 mb-8">
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
                      "Įrašykite papildomus reikalavimus, jeigu tokių turite"
                    }
                    className="px-2"
                    {...register("extraPrompt")}
                  />
                </label>
                <p className="fieldset-label">
                  Galite pridėti tokius reikalavimus, kaip "Duokite 20
                  uždavinių, padarykite tekstinius"
                </p>
                <p className="text-error mt-8 text-lg">
                  {errors.extraPrompt?.message}
                </p>
              </fieldset>
            </div>
          </div>
        )}

        <div className="mt-32 text-center flex gap-8">
          <button
            className="w-full font-bold rounded-lg shadow-lg border-1 hover:bg-purple-200/10 hover:scale-105 transition-transform duration-300"
            onClick={() => handlePrevious()}
          >
            Atgal
          </button>
          <button
            className="w-full p-4 bg-primary text-white font-bold rounded-lg shadow-lg hover:bg-indigo-600 hover:scale-105 transition-transform duration-300"
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
