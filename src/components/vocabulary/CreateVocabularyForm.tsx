import React from "react";
import { Dialog, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

interface CreateVocabularyFormProps{
  isOpen: boolean,
  onClose: ()=>void;
}

const CreateVocabularyForm: React.FC<CreateVocabularyFormProps> = ({isOpen, onClose}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Create vocabulary"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description" color={"black"}>
          Here is some text used for vocabulary creation
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default CreateVocabularyForm;