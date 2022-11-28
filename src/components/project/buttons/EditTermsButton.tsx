import React from "react";
import { ActionButton } from "../../common/ActionButton";
import { Typography } from "@mui/material";
import t from "../../i18n";
import EditIcon from "@mui/icons-material/Edit";
import { ProjectData } from "../../../@types";
import { getEditTermLink } from "../../../utils/QueryUtil";

interface EditTermsButtonProps {
  project: ProjectData;
}

const EditTermsButton: React.FC<EditTermsButtonProps> = ({ project }) => {
  return (
    <ActionButton
      variant="contained"
      startIcon={<EditIcon />}
      href={getEditTermLink(project)}
    >
      <Typography variant={"subtitle2"}>{t`editTerms`}</Typography>
    </ActionButton>
  );
};
export default EditTermsButton;
