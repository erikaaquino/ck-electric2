interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  label: string;
  name: string;
  options: SelectOption[];
  defaultValue?: string;
  className?: string;
  required?: boolean;
}

export default function Select({
  label,
  name,
  options,
  defaultValue = '',
  className = '',
  required = false,
}: SelectProps) {
  return (
    <div className="space-y-1">
      <label htmlFor={name} className="text-base-bold text-neutral-950">
        {label}
        {required && <span className="text-negative-500 ml-1">*</span>}
      </label>
      <select
        id={name}
        name={name}
        defaultValue={defaultValue}
        required={required}
        className={`w-full bg-primary-50 border-transparent focus:border-primary-500 focus:ring-0 text-neutral-950 text-sm p-4 ${className}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
