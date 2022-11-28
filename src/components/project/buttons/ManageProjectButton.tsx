import React from "react";
import { ActionButtonWhite } from "../../common/ActionButton";
import { styled, Typography } from "@mui/material";
import t from "../../i18n";
import SettingsIcon from "@mui/icons-material/Settings";
import getIdFromIri from "../../../utils/getIdFromIri";
import { Link } from "react-router-dom";
import { Project, ProjectData } from "../../../@types";

const LinkToProject = styled(Link)(() => ({
  color: "white",
  textDecoration: "none",
}));

interface PublishButtonProps {
  project: Project | ProjectData;
}
const ManageProjectButton: React.FC<PublishButtonProps> = ({ project }) => {
  return (
    <LinkToProject to={getIdFromIri(project.uri)} state={{ project }}>
      <ActionButtonWhite variant="contained" startIcon={<SettingsIcon />}>
        <Typography variant={"subtitle2"} color={"black"}>
          {t`manage`}
        </Typography>
      </ActionButtonWhite>
    </LinkToProject>
  );
};
export default ManageProjectButton;
