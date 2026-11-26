import { Button, Stack } from "@chakra-ui/react";
import { useAction } from "@/shared/lib/useAction";
import { useForm, type FieldConfig } from "@/shared/lib/useForm";
import { compose, email, minLength, required } from "@/shared/lib/validators";
import { ErrorAlert } from "@/shared/ui/ErrorAlert";
import { FormFields } from "@/shared/ui/FormFields";
import { primaryButtonProps } from "@/shared/ui/styles";
import { useAuth } from "../model/AuthContext";

type Values = { name: string; email: string; password: string };

const fields: FieldConfig<Values>[] = [
  { name: "name", label: "Имя", validate: required() },
  { name: "email", label: "E-mail", type: "email", validate: compose(required(), email) },
  { name: "password", label: "Пароль (минимум 8 символов)", type: "password", validate: compose(required(), minLength(8)) },
];

export function RegisterForm() {
  const { register } = useAuth();
  const form = useForm<Values>(fields, { name: "", email: "", password: "" });
  const action = useAction();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const { name, email, password } = form.values;
        if (form.validate()) action.run(() => register(name.trim(), email, password));
      }}
    >
      <Stack gap="4" pt="4">
        <FormFields fields={fields} values={form.values} errors={form.errors} onChange={form.setValue} />
        <ErrorAlert message={action.error} />
        <Button type="submit" loading={action.busy} {...primaryButtonProps}>
          Зарегистрироваться
        </Button>
      </Stack>
    </form>
  );
}
