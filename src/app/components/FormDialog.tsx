import React, { ReactNode } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Box,
} from '@material-ui/core'
import t from 'app/components/i18n'

export type FormDialogProps = {
  isOpen: boolean
  title: ReactNode
  children: ReactNode
  submitLabel: ReactNode
  handleClose: () => void
  handleSubmit: () => void
}

const FormDialog: React.FC<FormDialogProps> = ({
  isOpen,
  title,
  children,
  submitLabel,
  handleClose,
  handleSubmit,
}) => (
  <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="xs">
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      {children}
      <Box my={2} />
      <Button
        onClick={handleSubmit}
        color="primary"
        variant="contained"
        fullWidth
        size="large"
      >
        {submitLabel}
      </Button>
      <Box my={1} />
      <Button onClick={handleClose} color="primary" fullWidth size="large">
        {t`app.cancel`}
      </Button>
      <Box my={1} />
    </DialogContent>
  </Dialog>
)

export default FormDialog
