interface ComputedScreenProps {
    screenNumber: number
    bmi?: number
  }
  
  export default function ComputedScreen({ screenNumber, bmi }: ComputedScreenProps) {
    if (screenNumber === 4) {
      return (
        <div className="text-center" data-testid="computed-screen">
          <p className="text-gray-600 text-lg">Your BMI has been calculated.</p>
          {bmi && (
            <p className="text-2xl font-bold mt-2">BMI: {bmi.toFixed(1)}</p>
          )}
        </div>
      )
    }
    return null
  }