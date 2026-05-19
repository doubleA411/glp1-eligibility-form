interface CheckboxInputProps {
    options: string[]
    value: string[]
    onChange: (value: string[]) => void
  }
  
  export default function CheckboxInput({ options, value, onChange }: CheckboxInputProps) {
    const toggle = (option: string) => {
      if (value.includes(option)) {
        onChange(value.filter((v) => v !== option))
      } else {
        onChange([...value, option])
      }
    }
  
    return (
      <div className="flex flex-col gap-3">
        {options.map((option) => (
          <label
            key={option}
            className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 hover:text-black"
          >
            <input
              aria-labelledby="screen-prompt"
              type="checkbox"
              data-testid={`checkbox-input-${option.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
              checked={value.includes(option)}
              onChange={() => toggle(option)}
              className="w-4 h-4"
            />
            {option}
          </label>
        ))}
        <label
            key={'na'}
            className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 hover:text-black"
          >
            <input
              aria-labelledby="screen-prompt"
              type="checkbox"
              data-testid={'checkbox-input-na}'}
              checked={value.includes('na')}
              onChange={() => toggle('na')}
              className="w-4 h-4"
            />
            NA
          </label>
      </div>
    )
  }