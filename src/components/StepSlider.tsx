import React, { FC } from "react";

const StepSlider: FC<{ sliderStep: number }> = ({ sliderStep }) => {
  return (
    <ul className="steps w-full my-8 text-stone-300 text-xs lg:text-base">
      <li className="step step-primary">Dalykas</li>
      <li className={`step ${sliderStep >= 2 ? "step-primary" : ""}`}>Klasė</li>
      <li className={`step ${sliderStep >= 3 ? "step-primary" : ""} `}>Tema</li>
      <li className={`step ${sliderStep >= 4 ? "step-primary" : ""} `}>
        Lygis
      </li>
      <li className={`step ${sliderStep >= 5 ? "step-primary" : ""} `}>
        Kiekis
      </li>
      <li className={`step ${sliderStep >= 6 ? "step-primary" : ""} `}>
        Aprašymas
      </li>
    </ul>
  );
};

export default StepSlider;
