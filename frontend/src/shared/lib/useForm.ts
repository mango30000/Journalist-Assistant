import { useState } from "react";
import type { Validator } from "./validators";

export type FieldType = "text" | "textarea" | "select" | "date" | "email" | "password";

export type FieldConfig<T> = {
  name: keyof T & string;
  label: string;
  type?: FieldType;
  options?: readonly string[];
  validate?: Validator;
};

export type FormErrors<T> = Partial<Record<keyof T & string, string>>;

export function useForm<T extends Record<string, string>>(fields: FieldConfig<T>[], initial: T) {
  const [values, setValues] = useState<T>(initial);
  const [errors, setErrors] = useState<FormErrors<T>>({});

  const setValue = (name: keyof T & string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = (): boolean => {
    const next: FormErrors<T> = {};
    for (const field of fields) {
      const message = field.validate?.(values[field.name]) ?? null;
      if (message) next[field.name] = message;
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const reset = (value: T = initial) => {
    setValues(value);
    setErrors({});
  };

  return { values, errors, setValue, validate, reset };
}
