import { Button, Stack } from "@chakra-ui/react";
import { useAction } from "@/shared/lib/useAction";
import { useForm, type FieldConfig } from "@/shared/lib/useForm";
import { compose, email, required } from "@/shared/lib/validators";
import { ErrorAlert } from "@/shared/ui/ErrorAlert";
import { FormFields } from "@/shared/ui/FormFields";
import { primaryButtonProps } from "@/shared/ui/styles";
import { useAuth } from "../model/AuthContext";

type Values = { email: string; password: string };

const fields: FieldConfig<Values>[] = [
  { name: "email", label: "E-mail", type: "email", validate: compose(required(), email) },
  { name: "password", label: "Пароль", type: "password", validate: required() },
];

export function LoginForm() {
  const { login } = useAuth();
  const form = useForm<Values>(fields, { email: "", password: "" });
  const action = useAction();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (form.validate()) action.run(() => login(form.values.email, form.values.password));
      }}
    >
      <Stack gap="4" pt="4">
        <FormFields fields={fields} values={form.values} errors={form.errors} onChange={form.setValue} />
        <ErrorAlert message={action.error} />
        <Button type="submit" loading={action.busy} {...primaryButtonProps}>
          Войти
        </Button>
      </Stack>
    </form>
  );
}
