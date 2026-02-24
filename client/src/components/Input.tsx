interface InputProps {
  label: string;
  name: string;
  placeholder?: string;
  type?: 'text' | 'tel' | 'email';
  defaultValue?: string;
  className?: string;
  required?: boolean;
}

export default function Input({
  label,
  name,
  placeholder = '',
  type = 'text',
  defaultValue = '',
  className = '',
  required = false,
}: InputProps) {
  return (
    <div className="space-y-1">
      <label htmlFor={name} className="text-base-bold text-neutral-950">
        {label}
        {required && <span className="text-negative-500 ml-1">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        className={`w-full bg-primary-50 border-transparent focus:border-primary-500 focus:ring-0 text-neutral-950 text-sm p-4 ${className}`}
      />
    </div>
  );
}
