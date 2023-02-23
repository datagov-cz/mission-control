import React from "react";
import useToggle from "../../hooks/useToggle";
import CreateVocabularyForm from "./CreateVocabularyForm";
import { Typography } from "@mui/material";
import { ActionButton } from "../common/ActionButton";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import t from "../i18n";

const CreateVocabulary: React.FC = () => {
  const { isOpen, open, close } = useToggle();
  return (
    <>
      <ActionButton
        variant="contained"
        endIcon={<AddOutlinedIcon />}
        onClick={open}
        sx={{ marginBottom: 1 }}
      >
        <Typography variant={"subtitle2"}>{t`createVocabulary`}</Typography>
      </ActionButton>
      <CreateVocabularyForm isOpen={isOpen} onClose={close} />
    </>
  );
};

export default CreateVocabulary;
