"use client";

import { FieldConfig } from "@/lib/banks/types";

interface FormFieldProps {
  field: FieldConfig;
  value: string;
  error?: string;
  onChange: (key: string, value: string) => void;
}

const inputTypeMap: Record<FieldConfig["type"], string> = {
  text: "text",
  date: "date",
  time: "time",
  number: "number",
};

export function FormField({ field, value, error, onChange }: FormFieldProps) {
  return (
    <div className="mb-5">
      <label
        htmlFor={field.key}
        className="mb-2 block text-lg font-medium text-slate-800"
      >
        {field.label}
      </label>
      <input
        id={field.key}
        name={field.key}
        type={inputTypeMap[field.type]}
        inputMode={field.type === "number" ? "decimal" : undefined}
        value={value}
        onChange={(e) => onChange(field.key, e.target.value)}
        className={`w-full rounded-xl border px-4 py-4 text-lg focus:outline-none focus:ring-2 ${
          error
            ? "border-red-400 focus:ring-red-300"
            : "border-slate-300 focus:ring-blue-300"
        }`}
      />
      {error && <p className="mt-1 text-base text-red-600">{error}</p>}
    </div>
  );
}
