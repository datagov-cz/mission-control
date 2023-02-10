import React from "react";
import { Button, ButtonProps, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import t from "../../i18n";

//TODO: Add logic
const RemoveVocabularyButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button
      variant="outlined"
      startIcon={<DeleteIcon />}
      color={"error"}
      sx={{ backgroundColor: "white" }}
      {...props}
    >
      <Typography variant={"subtitle2"}>{t`removeVocabulary`}</Typography>
    </Button>
  );
};
export default RemoveVocabularyButton;
