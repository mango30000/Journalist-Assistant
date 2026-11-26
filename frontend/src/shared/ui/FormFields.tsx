import { Field, Input, NativeSelect, Stack, Textarea } from "@chakra-ui/react";
import type { FieldConfig, FormErrors } from "@/shared/lib/useForm";

type Props<T> = {
  fields: FieldConfig<T>[];
  values: T;
  errors: FormErrors<T>;
  onChange: (name: keyof T & string, value: string) => void;
};

export function FormFields<T extends Record<string, string>>({ fields, values, errors, onChange }: Props<T>) {
  return (
    <Stack gap="4">
      {fields.map((field) => {
        const value = values[field.name];
        const set = (v: string) => onChange(field.name, v);
        return (
          <Field.Root key={field.name} invalid={!!errors[field.name]}>
            <Field.Label>{field.label}</Field.Label>
            {field.type === "textarea" ? (
              <Textarea rows={4} value={value} onChange={(e) => set(e.target.value)} />
            ) : field.type === "select" ? (
              <NativeSelect.Root>
                <NativeSelect.Field value={value} onChange={(e) => set(e.target.value)}>
                  {field.options?.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
            ) : (
              <Input type={field.type ?? "text"} value={value} onChange={(e) => set(e.target.value)} />
            )}
            <Field.ErrorText>{errors[field.name]}</Field.ErrorText>
          </Field.Root>
        );
      })}
    </Stack>
  );
}
