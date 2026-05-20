"use client";

import NumberInput from "./inputs/NumberInput";
import RadioInput from "./inputs/RadioInput";
import CheckboxInput from "./inputs/CheckboxInput";
import ComputedScreen from "./inputs/ComputedScreen";

import { useState } from "react";

interface Screen {
  screen: number;
  prompt: string;
  type: string;
  options?: string[];
}

interface FormScreenProps {
  screen: Screen;
  value: any;
  onChange: (value: any) => void;
  onNext: () => void;
  bmi?: number;
  progress: number;
}

export default function FormScreen({
  screen,
  value,
  onChange,
  onNext,
  bmi,
  progress,
}: FormScreenProps) {
  const [error, setError] = useState<string | null>(null);

  const renderInput = () => {
    switch (screen.type) {
      case "number":
        return <NumberInput value={value ?? ""} onChange={onChange} />;
      case "radio":
        return (
          <RadioInput
            options={screen.options ?? []}
            value={value}
            onChange={onChange}
          />
        );
      case "checkbox":
        return (
          <CheckboxInput
            options={screen.options ?? []}
            value={value ?? []}
            onChange={onChange}
          />
        );
      case "computed":
        return <ComputedScreen screenNumber={screen.screen} bmi={bmi} />;
      default:
        return null;
    }
  };

  const optionalCheckboxScreens = [6, 9, 10, 14]

  const handleNext = () => {
    if (screen.type === 'checkbox' && !optionalCheckboxScreens.includes(screen.screen)) {
      if (!value || (Array.isArray(value) && value.length === 0)) {
        setError('Please select at least one option.')
        return
      }
    }
    
    if (screen.type !== 'computed' && screen.type !== 'checkbox' && !value && value !== 0) {
      setError('Please answer this question before continuing.')
      return
    }
    
    setError(null)
    onNext()
  }

  return (
    <div data-testid={`screen-${screen.screen}`} className="flex flex-col gap-6">
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-sm text-gray-400">Step {screen.screen} of 15</p>

      {screen.prompt && (
        <h2
          id="screen-prompt"
          data-testid="screen-prompt"
          className="text-2xl font-semibold text-slate-100"
        >
          {screen.prompt}
        </h2>
      )}

      {renderInput()}

      {error && (
        <p
          role="alert"
          aria-live="polite"
          className="text-red-600 text-xs"
          data-testid="error-message"
        >
          {error}
        </p>
      )}

      <button
        data-testid="next-button"
        onClick={handleNext}
        className="w-full bg-white text-black py-3 rounded-lg text-lg font-medium hover:cursor-pointer hover:bg-slate-300 transition-colors"
      >
        Next
      </button>
    </div>
  );
}
