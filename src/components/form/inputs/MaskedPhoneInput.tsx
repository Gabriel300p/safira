import { Input } from "@/components/ui/input";
import React from "react";

interface MaskedPhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const MaskedPhoneInput: React.FC<MaskedPhoneInputProps> = ({
  value,
  onChange,
  placeholder = "(99) 99999-9999",
}) => {
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNums = e.target.value.replace(/[^0-9]/g, "");
    let formatted = onlyNums;

    if (onlyNums.length >= 2) {
      formatted = `(${onlyNums.slice(0, 2)}) ${onlyNums.slice(2, 7)}`;
      if (onlyNums.length > 7) {
        formatted += `-${onlyNums.slice(7, 11)}`;
      }
    }

    onChange(formatted);
  };

  return (
    <Input
      type="tel"
      value={value}
      onChange={handlePhoneChange}
      placeholder={placeholder}
      className="input-class" // Adicione classes de estilo conforme necessário
    />
  );
};
