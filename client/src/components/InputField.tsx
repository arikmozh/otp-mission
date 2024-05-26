import React from "react";

interface InputFieldProps {
  type: string;
  id: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  required?: boolean;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  id,
  placeholder,
  value,
  onChange,
  maxLength,
  required,
  onKeyPress,
}) => {
  return (
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      required={required}
      onKeyPress={onKeyPress}
      className="input-field"
    />
  );
};

export default InputField;
