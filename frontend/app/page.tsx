"use client";

import { useForm } from "@/hooks/useForm";
import { useFormStore } from "@/store/formStore";
import FormScreen from "@/components/FormScreen";
import ResultScreen from "@/components/ResultScreen";

export default function Home() {

  const {
    currentScreen,
    result,
    loading,
    currentValue,
    progress,
    error,
    answers,
    schema,
    setCurrentValue,
    handleNext,
    computeBMI,
    resetSession
  } = useForm();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (result) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-lg">
          <ResultScreen result={result} answers={answers} schema={schema} />
          <button
          data-testid="reset-button"
          onClick={resetSession}
          className="w-full border mt-4 border-gray-300 text-gray-600 py-3 rounded-lg text-lg font-medium cursor-pointer hover:bg-gray-50 transition-colors"
        >
          Start Over
        </button>
        </div>
      </div>
    );
  }

  if (!currentScreen) return null;

  return (
    <main className="min-h-screen flex items-center justify-center p-6">

      <div className="w-full max-w-lg">
        <FormScreen
          screen={currentScreen}
          value={currentValue}
          onChange={setCurrentValue}
          onNext={handleNext}
          bmi={computeBMI()}
          progress={progress}
        />
      </div>
    </main>
  );
}
