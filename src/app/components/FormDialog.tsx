import React, { ReactNode } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
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
    <DialogContent>{children}</DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        {t`app.cancel`}
      </Button>
      <Button onClick={handleSubmit} color="primary" variant="contained">
        {submitLabel}
      </Button>
    </DialogActions>
  </Dialog>
)

export default FormDialog
