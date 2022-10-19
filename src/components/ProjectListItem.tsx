import React from "react";
import { Project } from "../@types";
import LineBoxWrapper from "./common/LineBoxWrapper";
import { Box, Button, styled, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import getIdFromIri from "../utils/getIdFromIri";
import { UserProfile } from "./user/UserProfiles";

interface Props {
  project: Project;
}

const CenteredSpacedOutBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

const LinkToProject = styled(Link)(() => ({
  color: "white",
  textDecoration: "none",
  paddingRight: "16px",
}));

const ActionButton = styled(Button)(() => ({
  padding: 0,
  color: "black",
  backgroundColor: "white",
}));

const ProjectListItem: React.FC<Props> = ({ project }) => {
  return (
    <LineBoxWrapper>
      <CenteredSpacedOutBox>
        <Box width={300}>
          <Typography variant={"body1"} color={"white"}>
            {" "}
            {project.label}
          </Typography>
        </Box>
        <UserProfile user={project.lastEditor} />
        <ActionButton
          variant="contained"
          startIcon={<SettingsIcon sx={{ marginLeft: "16px" }} />}
        >
          <LinkToProject to={getIdFromIri(project.uri)} state={{ project }}>
            <Typography variant={"subtitle2"} color={"black"}>
              {" "}
              Spravovat
            </Typography>
          </LinkToProject>
        </ActionButton>
      </CenteredSpacedOutBox>
    </LineBoxWrapper>
  );
};

export default ProjectListItem;
