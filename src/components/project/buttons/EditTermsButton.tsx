import React from "react";
import { ActionButton, ActionButtonProps } from "../../common/ActionButton";
import { Typography } from "@mui/material";
import t from "../../i18n";
import EditIcon from "@mui/icons-material/Edit";
import { getEditTermLink } from "../../../utils/QueryUtil";
import { ProjectDetailProps } from "../Project";

const EditTermsButton: React.FC<ProjectDetailProps & ActionButtonProps> = ({
  project,
  textColor,
  backgroundColor,
  disabled = false,
}) => {
  return (
    <ActionButton
      sx={{ minWidth: 170 }}
      backgroundColor={backgroundColor}
      textColor={textColor}
      variant="contained"
      startIcon={<EditIcon />}
      href={getEditTermLink(project)}
      disabled={disabled}
      // @ts-ignore
      target="_blank"
      rel="noopener noreferrer"
    >
      <Typography variant={"subtitle2"}>{t`editTerms`}</Typography>
    </ActionButton>
  );
};
export default EditTermsButton;
