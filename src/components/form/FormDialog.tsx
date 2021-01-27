import React, { ReactNode } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Box,
} from '@material-ui/core'

import t from 'components/i18n'
import Form from './Form'
import SubmitButton from './SubmitButton'

export type FormDialogProps = {
  isOpen: boolean
  title: ReactNode
  children: ReactNode
  submitLabel: ReactNode
  onClose: () => void
  onSubmit: (data: any) => void
}

const FormDialog: React.FC<FormDialogProps> = ({
  isOpen,
  title,
  children,
  submitLabel,
  onClose,
  onSubmit,
}) => {
  return (
    <Form>
      <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="xs">
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          {children}
          <Box my={2} />
          <SubmitButton onClick={onSubmit}>{submitLabel}</SubmitButton>
          <Box my={1} />
          <Button onClick={onClose} color="primary" fullWidth size="large">
            {t`common.cancel`}
          </Button>
          <Box my={1} />
        </DialogContent>
      </Dialog>
    </Form>
  )
}

export default FormDialog
