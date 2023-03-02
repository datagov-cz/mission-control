import React from "react";
import { Button, ButtonProps, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import t from "../../i18n";

const RemoveVocabularyButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button
      variant="contained"
      startIcon={<DeleteIcon />}
      color={"error"}
      {...props}
    >
      <Typography variant={"subtitle2"}>{t`removeVocabulary`}</Typography>
    </Button>
  );
};
export default RemoveVocabularyButton;
