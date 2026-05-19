interface NumberInputProps {
    value: string
    onChange: (value: string) => void
  }
  
  export default function NumberInput({ value, onChange }: NumberInputProps) {
    return (
      <input
        aria-labelledby="screen-prompt"
        data-testid="number-input"
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    )
  }