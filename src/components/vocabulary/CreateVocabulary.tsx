import React from "react";
import useToggle from "../../hooks/useToggle";
import CreateVocabularyForm from "./CreateVocabularyForm";
import { ButtonProps, Typography } from "@mui/material";
import { ActionButton } from "../common/ActionButton";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import t from "../i18n";
import { AddVocabularyPayload } from "../../@types";

interface CreateVocabularyProps {
  submitAction: (payload: AddVocabularyPayload) => void;
}
const CreateVocabulary: React.FC<CreateVocabularyProps & ButtonProps> = ({
  submitAction,
  disabled,
}) => {
  const { isOpen, open, close } = useToggle();

  return (
    <>
      <ActionButton
        disabled={disabled}
        variant="contained"
        endIcon={<AddOutlinedIcon />}
        onClick={open}
        sx={{ marginBottom: 1 }}
      >
        <Typography variant={"subtitle2"}>{t`createVocabulary`}</Typography>
      </ActionButton>
      <CreateVocabularyForm
        isOpen={isOpen}
        onClose={close}
        submitAction={submitAction}
      />
    </>
  );
};

export default CreateVocabulary;
