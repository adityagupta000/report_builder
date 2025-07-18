"use client"

import type React from "react"

interface FieldInputProps {
  label: string
  value: string | number | undefined
  onChange: (value: string | number) => void
  type?: React.HTMLInputTypeAttribute
  disabled?: boolean
  placeholder?: string
  required?: boolean
  min?: number
  max?: number
}

export const FieldInput: React.FC<FieldInputProps> = ({
  label,
  value,
  onChange,
  type = "text",
  disabled = false,
  placeholder = "",
  required = false,
  min,
  max,
}) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      disabled={disabled}
      placeholder={placeholder}
      required={required}
      min={min}
      max={max}
      className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
        disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "bg-white border-gray-300 hover:border-gray-400"
      }`}
      value={value ?? ""}
      onChange={(e) => onChange(type === "number" ? Number(e.target.value) : e.target.value)}
    />
  </div>
)

interface FieldTextareaProps {
  label: string
  value: string | undefined
  onChange: (value: string) => void
}

export const FieldTextarea: React.FC<FieldTextareaProps> = ({ label, value, onChange }) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
    <textarea
      rows={3}
      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
)

interface FieldSelectProps {
  label: string
  value: string | undefined
  options: string[]
  onChange: (value: string) => void
}

export const FieldSelect: React.FC<FieldSelectProps> = ({ label, value, options, onChange }) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
    <select
      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">— Select Category —</option>
      {options.map((opt, i) => (
        <option key={i} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
)
