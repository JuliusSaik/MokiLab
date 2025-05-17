import React from "react";
import { RequestPrompt } from "../state/models/RequestModels";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";

export interface CountSelectorProps {
  setValue: UseFormSetValue<RequestPrompt>;
  watch: UseFormWatch<RequestPrompt>;
}

const CountSelector: React.FC<CountSelectorProps> = ({ watch, setValue }) => {
  const selectedCount = watch("count") || 2;
  console.log(selectedCount);
  return (
    <div className="w-full">
      <input
        type="range"
        min={1}
        max={10}
        value={selectedCount}
        className="range w-full range-primary"
        step="1"
        onChange={(e) => setValue("count", parseInt(e.target.value, 10))}
      />
      <div className="flex justify-between px-2.5 mt-2 text-xs">
        {Array.from({ length: 10 }, (_, i) => (
          <span key={i}>{i + 1}</span>
        ))}
      </div>
    </div>
  );
};

export default CountSelector;
