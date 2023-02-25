import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import t from "../i18n";

interface AlertDialogSlideProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const DeleteProjectAlert: React.FC<AlertDialogSlideProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {

  return (
    <Dialog
      open={isOpen}
      keepMounted
      onClose={onClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{t`deleteProjectTitle`}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {t`deleteProjectDescription`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t`false`}</Button>
        <Button onClick={onSubmit}>{t`true`}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteProjectAlert;