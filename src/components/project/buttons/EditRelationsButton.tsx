import React from "react";
import { ActionButton, ActionButtonProps } from "../../common/ActionButton";
import { Typography } from "@mui/material";
import t from "../../i18n";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { getEditRelationsLink } from "../../../utils/QueryUtil";
import { ProjectDetailProps } from "../Project";

const EditRelationsButton: React.FC<ProjectDetailProps & ActionButtonProps> = ({
  project,
  textColor,
  backgroundColor,
  disabled = false,
}) => {
  return (
    <ActionButton
      backgroundColor={backgroundColor}
      textColor={textColor}
      variant="contained"
      startIcon={<AccountTreeIcon />}
      href={getEditRelationsLink(project)}
      disabled={disabled}
    >
      <Typography variant={"subtitle2"}>{t`editRelations`}</Typography>
    </ActionButton>
  );
};
export default EditRelationsButton;
