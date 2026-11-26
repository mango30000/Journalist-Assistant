import { useEffect } from "react";
import { Button, Dialog, Portal, Stack, Text } from "@chakra-ui/react";
import { useAction } from "@/shared/lib/useAction";
import { ErrorAlert } from "./ErrorAlert";
import { primaryButtonProps } from "./styles";

type Props = {
  open: boolean;
  title: string;
  text: string;
  confirmLabel?: string;
  onConfirm: () => Promise<void>;
  onClose: () => void;
};

export function ConfirmModal({ open, title, text, confirmLabel = "Удалить", onConfirm, onClose }: Props) {
  const { busy, error, run, clearError } = useAction();

  useEffect(() => {
    if (open) clearError();
  }, [open, clearError]);

  return (
    <Dialog.Root open={open} onOpenChange={(e) => !e.open && onClose()} role="alertdialog" placement="center" lazyMount unmountOnExit>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content mx="4">
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Stack gap="3">
                <Text>{text}</Text>
                <ErrorAlert message={error} />
              </Stack>
            </Dialog.Body>
            <Dialog.Footer>
              <Button variant="outline" onClick={onClose}>
                Отмена
              </Button>
              <Button {...primaryButtonProps} loading={busy} onClick={async () => (await run(onConfirm)) && onClose()}>
                {confirmLabel}
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
