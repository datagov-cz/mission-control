import React, { ReactNode } from 'react'
import { Box } from '@material-ui/core'

import Dialog, { DialogProps } from './Dialog'
import Form from './Form'
import SubmitButton from './SubmitButton'

export type FormDialogProps = DialogProps & {
  submitLabel: ReactNode
  onSubmit: (data: any) => void
}

const FormDialog: React.FC<FormDialogProps> = ({
  children,
  submitLabel,
  onSubmit,
  ...props
}) => {
  return (
    <Form>
      <Dialog {...props}>
        {children}
        <Box my={3} />
        <SubmitButton onClick={onSubmit}>{submitLabel}</SubmitButton>
        <Box my={2} />
      </Dialog>
    </Form>
  )
}

export default FormDialog
