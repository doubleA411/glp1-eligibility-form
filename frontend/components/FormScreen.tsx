'use client'

import NumberInput from './inputs/NumberInput'
import RadioInput from './inputs/RadioInput'
import CheckboxInput from './inputs/CheckboxInput'
import ComputedScreen from './inputs/ComputedScreen'

interface Screen {
  screen: number
  prompt: string
  type: string
  options?: string[]
}

interface FormScreenProps {
  screen: Screen
  value: any
  onChange: (value: any) => void
  onNext: () => void
  bmi?: number
  progress: number
}

export default function FormScreen({ screen, value, onChange, onNext, bmi, progress }: FormScreenProps) {
  const renderInput = () => {
    switch (screen.type) {
      case 'number':
        return <NumberInput value={value ?? ''} onChange={onChange} />
      case 'radio':
        return <RadioInput options={screen.options ?? []} value={value} onChange={onChange} />
      case 'checkbox':
        return <CheckboxInput options={screen.options ?? []} value={value ?? []} onChange={onChange} />
      case 'computed':
        return <ComputedScreen screenNumber={screen.screen} bmi={bmi} />
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Screen number */}
      <p className="text-sm text-gray-400">Step {screen.screen} of 15</p>

      {/* Prompt */}
      {screen.prompt && (
        <h2
          data-testid="screen-prompt"
          className="text-2xl font-semibold text-gray-800"
        >
          {screen.prompt}
        </h2>
      )}

      {/* Input */}
      {renderInput()}

      {/* Next button */}
      <button
        data-testid="next-button"
        onClick={onNext}
        className="w-full bg-blue-500 text-white py-3 rounded-lg text-lg font-medium hover:bg-blue-600 transition-colors"
      >
        Next
      </button>
    </div>
  )
}