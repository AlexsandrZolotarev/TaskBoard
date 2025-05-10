import React, { useState, type InputHTMLAttributes } from "react";
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement>{
    label:string,
    error?: string
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  className,
  type,
  ...inputProps
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const inputType = type === "password" && isPasswordVisible ? "text" : type

  return (
    <div className="space-y-1">
      <label className="block font-medium">{label}</label>

      <div className="relative">
        <input
          type={inputType}
          {...inputProps}
          className={`${className} border rounded px-3 py-2 w-full pr-10 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />

        {type === "password" && (
          <span
            className="absolute right-3 top-2 cursor-pointer select-none"
            onClick={() => setIsPasswordVisible((prev) => !prev)}
          >
            {isPasswordVisible ? (
              <EyeSlashIcon className="w-5 h-5 text-gray-600" />
            ) : (
              <EyeIcon className="w-5 h-5 text-gray-600" />
            )}
          </span>
        )}
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  )
}
