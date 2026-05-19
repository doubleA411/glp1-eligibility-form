interface ResultScreenProps {
    result: string
  }
  
  export default function ResultScreen({ result }: ResultScreenProps) {
    const config = {
      eligible: {
        title: 'Eligible',
        message: 'You may be eligible for GLP-1 weight-loss medication. Please consult your doctor.',
        color: 'text-green-600',
        bg: 'bg-green-50',
        border: 'border-green-200',
      },
      ineligible: {
        title: 'Ineligible',
        message: 'Based on your responses, you do not meet the criteria for GLP-1 medication at this time.',
        color: 'text-red-600',
        bg: 'bg-red-50',
        border: 'border-red-200',
      },
      clinical_review: {
        title: 'Clinical Review',
        message: 'Your responses require further review by a healthcare professional.',
        color: 'text-yellow-600',
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
      },
    }
  
    const { title, message, color, bg, border } = config[result as keyof typeof config] ?? config.clinical_review
  
    return (
      <div className={`p-8 rounded-xl border ${bg} ${border} text-center flex flex-col gap-4`}>
        <h2
          data-testid="result"
          className={`text-3xl font-bold ${color}`}
        >
          {title}
        </h2>
        <p className="text-gray-600">{message}</p>
      </div>
    )
  }