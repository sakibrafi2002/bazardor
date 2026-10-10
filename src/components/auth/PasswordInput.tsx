"use client";

import { useState } from "react";
import { Input } from "@heroui/react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { inputClassNames } from "@/lib/auth-utils";

interface Props {
  label: string;
  placeholder: string;
  value: string;
  onValueChange: (value: string) => void;
  error?: string; // validation message shown under the field
  autoComplete?: string;
}

// A password field with an eye button that shows/hides the text.
export default function PasswordInput({
  label,
  placeholder,
  value,
  onValueChange,
  error,
  autoComplete,
}: Props) {
  // true = show the characters, false = show dots
  const [visible, setVisible] = useState(false);

  return (
    <Input
      label={label}
      labelPlacement="outside"
      placeholder={placeholder}
      variant="bordered"
      // Switching the type between "text" and "password" does the hide/show
      type={visible ? "text" : "password"}
      value={value}
      onValueChange={onValueChange}
      autoComplete={autoComplete}
      isInvalid={!!error} // red border when there is an error
      errorMessage={error}
      classNames={inputClassNames}
      endContent={
        <button
          type="button" // IMPORTANT: stops this button from submitting the form
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখান"}
          className="text-slate-400 hover:text-slate-700"
        >
          {visible ? <FiEyeOff /> : <FiEye />}
        </button>
      }
    />
  );
}