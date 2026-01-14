import { ConfirmationModalProps } from '@/types'
import { Button } from '@gymapp/gymui/Button'
import { Modal } from '@gymapp/gymui/Modal'

export const ConfirmationModal = ({
  open,
  setOpen,
  title,
  description,
  confirmButtonText = '',
  destructive = false,
}: ConfirmationModalProps) => {
  return (
    <Modal open={open} onOpenChange={setOpen}>
      <Modal.Content sx={{ gap: '48px' }}>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
          <Modal.Description>{description}</Modal.Description>
        </Modal.Header>
        {destructive ? (
          <Modal.Footer>
            <Button.Secondary onClick={() => setOpen(false)}>Cancel</Button.Secondary>
            <Button.Danger>Delete</Button.Danger>
          </Modal.Footer>
        ) : (
          <Modal.Footer>
            <Button.Danger onClick={() => setOpen(false)}>Cancel</Button.Danger>
            <Button.Primary>{confirmButtonText}</Button.Primary>
          </Modal.Footer>
        )}
      </Modal.Content>
    </Modal>
  )
}
