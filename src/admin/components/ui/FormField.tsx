interface FieldProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  options?: { value: string | number; label: string }[];
  textarea?: boolean;
}

export default function FormField({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
  options,
  textarea,
}: FieldProps) {
  const baseClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-50";

  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {textarea ? (
        <textarea
          id={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          rows={4}
          className={`${baseClass} resize-y`}
        />
      ) : options ? (
        <select
          id={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className={baseClass}
        >
          <option value="">Sélectionner...</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className={baseClass}
        />
      )}
    </div>
  );
}
