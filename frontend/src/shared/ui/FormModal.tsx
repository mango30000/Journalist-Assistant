import { useEffect } from "react";
import { Button, CloseButton, Dialog, Portal, Stack } from "@chakra-ui/react";
import { useAction } from "@/shared/lib/useAction";
import { useForm, type FieldConfig } from "@/shared/lib/useForm";
import { ErrorAlert } from "./ErrorAlert";
import { FormFields } from "./FormFields";
import { primaryButtonProps } from "./styles";

type Props<T> = {
  open: boolean;
  title: string;
  submitLabel?: string;
  fields: FieldConfig<T>[];
  initialValues: T;
  onSubmit: (values: T) => Promise<void>;
  onClose: () => void;
};

/** Универсальное модальное окно с формой: валидация, ошибки сервера, анимация открытия. */
export function FormModal<T extends Record<string, string>>({
  open,
  title,
  submitLabel = "Сохранить",
  fields,
  initialValues,
  onSubmit,
  onClose,
}: Props<T>) {
  const form = useForm<T>(fields, initialValues);
  const action = useAction();

  useEffect(() => {
    if (open) {
      form.reset(initialValues);
      action.clearError();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const submit = async () => {
    if (!form.validate()) return;
    if (await action.run(() => onSubmit(form.values))) onClose();
  };

  return (
    <Dialog.Root open={open} onOpenChange={(e) => !e.open && onClose()} placement="center" lazyMount unmountOnExit>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content mx="4">
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <form
                id="form-modal"
                onSubmit={(e) => {
                  e.preventDefault();
                  submit();
                }}
              >
                <Stack gap="4">
                  <FormFields fields={fields} values={form.values} errors={form.errors} onChange={form.setValue} />
                  <ErrorAlert message={action.error} />
                </Stack>
              </form>
            </Dialog.Body>
            <Dialog.Footer>
              <Button variant="outline" onClick={onClose}>
                Отмена
              </Button>
              <Button type="submit" form="form-modal" loading={action.busy} {...primaryButtonProps}>
                {submitLabel}
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild position="absolute" top="2" right="2">
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
