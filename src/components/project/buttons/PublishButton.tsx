import React from "react";
import { ActionButton } from "../../common/ActionButton";
import { Typography } from "@mui/material";
import t from "../../i18n";
import SettingsIcon from "@mui/icons-material/Settings";

const PublishButton: React.FC = () => {
  return (
    <ActionButton variant="contained" startIcon={<SettingsIcon sx={{ marginLeft: "16px" }} />}>
      <Typography variant={"subtitle2"}>{t`publish`}</Typography>
    </ActionButton>
  );
};
export default PublishButton;
