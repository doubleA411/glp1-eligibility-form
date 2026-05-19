import { useEffect, useState } from "react";
import { useFormStore } from "@/store/formStore";

const API_URL = "http://localhost:3000/api";

export const useForm = () => {
  const {
    sessionId,
    currentScreen,
    answers,
    result,
    reset,
    setSessionId,
    setCurrentScreen,
    setAnswer,
    setResult,
  } = useFormStore();

  const [currentValue, setCurrentValue] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const savedSessionId = localStorage.getItem("sessionId");

      if (savedSessionId) {
        try {
          const res = await fetch(`${API_URL}/session/${savedSessionId}`);
          const data = await res.json();

          if (data.status === "in_progress") {
            setSessionId(savedSessionId);
            // find the last answered screen and get next
            const lastAnswer = data.answers.sort(
              (a: any, b: any) => b.screen - a.screen,
            )[0];
            if (lastAnswer) {
              // restore answers to store
              data.answers.forEach((a: any) => setAnswer(a.screen, a.value));
              // submit last answer again to get current screen
              const res = await fetch(`${API_URL}/session/answer`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  sessionId: savedSessionId,
                  screen: lastAnswer.screen,
                  value: lastAnswer.value,
                }),
              });
              const nextData = await res.json();
              if (nextData.nextScreen) setCurrentScreen(nextData.nextScreen);
              if (nextData.result) setResult(nextData.result);
            } else {
              // session exists but no answers yet — start from Screen 1
              const res = await fetch(`${API_URL}/session/start`, {
                method: "POST",
              });
              const newData = await res.json();
              setCurrentScreen(newData.screen);
            }
          }
        } catch {
          startNewSession();
        }
      } else {
        await startNewSession();
      }

      setLoading(false);
    };

    init();
  }, []);

  const startNewSession = async () => {
    try {
      const res = await fetch(`${API_URL}/session/start`, { method: "POST" });
      const data = await res.json();
      setSessionId(data.sessionId);
      setCurrentScreen(data.screen);
      localStorage.setItem("sessionId", data.sessionId);
    } catch (err) {
      console.error("Failed to start new session", err);
      setError("Something went wrong. Please try again.");
    }
  };

  const handleNext = async () => {
    if (!sessionId || !currentScreen) return;

    setAnswer(currentScreen.screen, currentValue);

    const parseValue = (type: string, value: any) => {
      if (type === "radio" && (value === "Yes" || value === "No")) {
        return value === "Yes";
      }
      if (type === "number") {
        return parseFloat(value);
      }
      return value;
    };
    const parsedValue = parseValue(currentScreen.type, currentValue);

    try {
      const res = await fetch(`${API_URL}/session/answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          screen: currentScreen.screen,
          value: parsedValue,
        }),
      });

      const data = await res.json();

      if (data.result) {
        setResult(data.result);
      } else if (data.nextScreen) {
        setCurrentScreen(data.nextScreen);
        setCurrentValue(null);
      }
    } catch (err) {
      console.error("Failed to save answer:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  const computeBMI = () => {
    const weight = answers[2];
    const height = answers[3];
    if (weight && height) {
      return weight / Math.pow(height / 100, 2);
    }
    return undefined;
  };

  const resetSession = async () => {
    localStorage.removeItem('sessionId')
    reset();
    setCurrentValue(null);
    await startNewSession()
  }

  const progress = currentScreen ? (currentScreen.screen / 15) * 100 : 0;

  return {
    loading,
    progress,
    currentScreen,
    currentValue,
    setCurrentValue,
    result,
    handleNext,
    computeBMI,
    resetSession
  };
};
