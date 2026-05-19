interface RadioInputProps {
    options: string[]
    value: string | null
    onChange: (value: string) => void
  }
  
  export default function RadioInput({ options, value, onChange }: RadioInputProps) {
    return (
      <div className="flex flex-col gap-3">
        {options.map((option) => (
          <label
            key={option}
            className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 hover:text-black"
          >
            <input
              aria-labelledby="screen-prompt"
              type="radio"
              data-testid={`radio-input-${option.toLowerCase().split('(')[0].trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
              checked={value === option}
              onChange={() => onChange(option)}
              className="w-4 h-4"
            />
            {option}
          </label>
        ))}
      </div>
    )
  }