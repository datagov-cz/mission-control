import React from "react";
import { Button, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import t from "../../i18n";

//TODO: Add logic
const RemoveVocabularyButton: React.FC = () => {
  return (
    <Button
      variant="outlined"
      startIcon={<DeleteIcon />}
      color={"error"}
      sx={{ backgroundColor: "white" }}
    >
      <Typography variant={"subtitle2"}>{t`removeVocabulary`}</Typography>
    </Button>
  );
};
export default RemoveVocabularyButton;
