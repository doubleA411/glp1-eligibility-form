interface RadioInputProps {
    options: string[]
    value: string | null
    onChange: (value: string) => void
  }
  
  export default function RadioInput({ options, value, onChange }: RadioInputProps) {
    return (
      <div className="flex flex-col gap-3">
        {options.map((option, i) => (
          <label
            key={option}
            className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer text-slate-700 hover:bg-gray-50 hover:border-blue-300 transition-colors"
          >
            <input
              aria-labelledby="screen-prompt"
              type="radio"
              data-testid={`radio-input-${option.toLowerCase().split('(')[0].trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
              checked={value === option}
              onChange={() => onChange(option)}
              autoFocus={i === 0}
              className="w-4 h-4"
            />
            {option}
          </label>
        ))}
      </div>
    )
  }