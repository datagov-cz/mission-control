import React from "react";
import { ActionButton } from "../../common/ActionButton";
import { Typography } from "@mui/material";
import t from "../../i18n";
import EditIcon from "@mui/icons-material/Edit";

//TODO: Add logic
const EditTermsButton: React.FC = () => {
  return (
    <ActionButton
      variant="contained"
      startIcon={<EditIcon />}
    >
      <Typography variant={"subtitle2"}>{t`editTerms`}</Typography>
    </ActionButton>
  );
};
export default EditTermsButton;
