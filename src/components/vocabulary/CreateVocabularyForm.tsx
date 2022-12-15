import React from "react";
import { Dialog } from "@mui/material";
import { useForm } from "react-hook-form";
import Form from "../form/Form";
import Checkbox from "../form/Checkbox";
import t from "../i18n";

interface CreateVocabularyFormProps{
  isOpen: boolean,
  onClose: ()=>void;
}

const CreateVocabularyForm: React.FC<CreateVocabularyFormProps> = ({isOpen, onClose}) => {
  const form = useForm();
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Form form={form}>
        <Checkbox
          name="defaultIri"
          defaultChecked={true}
          label={t`useDefaultVocabularyIri`}
        />
      </Form>
    </Dialog>
  );
};

export default CreateVocabularyForm;