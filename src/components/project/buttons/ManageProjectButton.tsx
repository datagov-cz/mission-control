import React from "react";
import { ActionButton, ActionButtonProps } from "../../common/ActionButton";
import { styled, Typography } from "@mui/material";
import t from "../../i18n";
import SettingsIcon from "@mui/icons-material/Settings";
import getIdFromIri from "../../../utils/getIdFromIri";
import { Link } from "react-router-dom";
import { ProjectDetailProps } from "../Project";

const LinkToProject = styled(Link)(() => ({
  color: "white",
  textDecoration: "none",
}));

const ManageProjectButton: React.FC<ProjectDetailProps & ActionButtonProps> = ({
  project,
  backgroundColor,
  textColor,
}) => {
  return (
    <LinkToProject
      to={`/projects/${getIdFromIri(project.uri)}`}
      state={{ project }}
    >
      <ActionButton
        backgroundColor={backgroundColor}
        textColor={textColor}
        variant="contained"
        startIcon={<SettingsIcon />}
      >
        <Typography variant={"subtitle2"}>{t`manage`}</Typography>
      </ActionButton>
    </LinkToProject>
  );
};
export default ManageProjectButton;
