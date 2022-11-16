import React from "react";
import { ActionButton } from "../../common/ActionButton";
import { Typography } from "@mui/material";
import t from "../../i18n";
import AccountTreeIcon from '@mui/icons-material/AccountTree';

//TODO: Add logic
const EditRelationsButton: React.FC = () => {
  return (
    <ActionButton variant="contained" startIcon={<AccountTreeIcon/>}>
      <Typography variant={"subtitle2"}>{t`editRelations`}</Typography>
    </ActionButton>
  );
};
export default EditRelationsButton;
