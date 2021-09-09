import React, { ReactNode } from "react";
import { Box } from "@mui/material";

import Dialog, { DialogProps } from "./Dialog";
import Form from "./Form";
import SubmitButton from "./SubmitButton";

export type FormDialogProps = DialogProps & {
  submitLabel: ReactNode;
  submitPendingLabel?: ReactNode;
  onSubmit: (data: any) => void;
};

const FormDialog: React.FC<FormDialogProps> = ({
  children,
  submitLabel,
  submitPendingLabel,
  onSubmit,
  ...props
}) => {
  return (
    <Form>
      <Dialog {...props}>
        {children}
        <Box my={3} />
        <SubmitButton onClick={onSubmit} pending={submitPendingLabel}>
          {submitLabel}
        </SubmitButton>
        <Box my={2} />
      </Dialog>
    </Form>
  );
};

export default FormDialog;
