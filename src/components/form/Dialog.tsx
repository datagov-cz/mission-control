import React, { ReactNode } from "react";
import {
  Dialog as MuiDialog,
  DialogProps as MuiDialogProps,
  DialogTitle,
  DialogContent,
  Box,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import Form from "./Form";

export type DialogProps = Omit<
  MuiDialogProps,
  "open" | "onClose" | "title" | "onSubmit"
> & {
  isOpen: boolean;
  title: ReactNode;
  onClose: () => void;
};

const Dialog: React.FC<DialogProps> = ({
  isOpen,
  title,
  children,
  onClose,
  ...props
}) => {
  return (
    <Form>
      <MuiDialog
        open={isOpen}
        onClose={onClose}
        fullWidth
        maxWidth="xs"
        {...props}
      >
        <DialogTitle>
          {title}
          {onClose ? (
            <IconButton
              aria-label="close"
              sx={{
                position: "absolute",
                right: 1,
                top: 1,
                color: "palette.grey[500]",
              }}
              onClick={onClose}
              size="large"
            >
              <CloseIcon />
            </IconButton>
          ) : null}
        </DialogTitle>
        <DialogContent>
          {children}
          <Box my={1} />
        </DialogContent>
      </MuiDialog>
    </Form>
  );
};

export default Dialog;
