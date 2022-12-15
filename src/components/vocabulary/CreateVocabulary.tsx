import React from "react";
import useToggle from "../../hooks/useToggle";
import CreateVocabularyForm from "./CreateVocabularyForm";
import { Typography } from "@mui/material";
import { ActionButton } from "../common/ActionButton";
import SettingsIcon from "@mui/icons-material/Settings";
import t from "../i18n";

const CreateVocabulary: React.FC = () => {
  const { isOpen, open, close } = useToggle();
  //TODO: Make the button visually correspond with the rest of the application
  return (
    <>
      <ActionButton
        variant="contained"
        startIcon={<SettingsIcon />}
        onClick={open}
      >
        <Typography variant={"subtitle2"}>{t`manage`}</Typography>
      </ActionButton>
      <CreateVocabularyForm isOpen={isOpen} onClose={close} />
    </>
  );
};

export default CreateVocabulary;