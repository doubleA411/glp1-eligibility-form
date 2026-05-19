import { Screen } from "@/store/formStore";

interface ResultScreenProps {
  result: string;
  answers: Record<number, any>;
  schema: Screen[];
}

export default function ResultScreen({
  result,
  answers,
  schema,
}: ResultScreenProps) {
  const config = {
    eligible: {
      title: "Eligible",
      message:
        "You may be eligible for GLP-1 weight-loss medication. Please consult your doctor.",
      color: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-200",
    },
    ineligible: {
      title: "Ineligible",
      message:
        "Based on your responses, you do not meet the criteria for GLP-1 medication at this time.",
      color: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-200",
    },
    clinical_review: {
      title: "Clinical Review",
      message:
        "Your responses require further review by a healthcare professional.",
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      border: "border-yellow-200",
    },
  };

  const { title, message, color, bg, border } =
    config[result as keyof typeof config] ?? config.clinical_review;

  const formatValue = (value: any) => {
    if (typeof value === "boolean") return value ? "Yes" : "No";
    if (Array.isArray(value))
      return value.length > 0 ? value.join(", ") : "None";
    if (value === null || value === undefined) return "N/A";
    return String(value);
  };

  return (
    <div className="flex flex-col gap-6">
      <div
        className={`p-8 rounded-xl border ${bg} ${border} text-center flex flex-col gap-4`}
      >
        <h2 data-testid="result" className={`text-3xl font-bold ${color}`}>
          {title}
        </h2>
        <p className="text-gray-600">{message}</p>
      </div>

      <div className="border border-gray-200 rounded-xl p-6 flex flex-col gap-4">
        <h3 className="font-semibold text-gray-700">Your Answers</h3>
        {schema
          .filter(
            (s) =>
              s.screen !== 4 &&
              s.screen !== 15 &&
              answers[s.screen] !== undefined,
          )
          .map((s) => (
            <div
              key={s.screen}
              className="flex justify-between text-sm border-b border-gray-100 pb-2"
            >
              <span className="text-gray-500">{s.prompt}</span>
              <span className="font-medium text-gray-800">
                {formatValue(answers[s.screen])}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}
