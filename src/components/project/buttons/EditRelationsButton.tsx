import React from "react";
import { ActionButton } from "../../common/ActionButton";
import { Typography } from "@mui/material";
import t from "../../i18n";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { getEditRelationsLink } from "../../../utils/QueryUtil";
import { ProjectData } from "../../../@types";

interface EditRelationsButtonProps {
  project: ProjectData;
}
const EditRelationsButton: React.FC<EditRelationsButtonProps> = ({
  project,
}) => {
  return (
    <ActionButton
      variant="contained"
      startIcon={<AccountTreeIcon />}
      href={getEditRelationsLink(project)}
    >
      <Typography variant={"subtitle2"}>{t`editRelations`}</Typography>
    </ActionButton>
  );
};
export default EditRelationsButton;
