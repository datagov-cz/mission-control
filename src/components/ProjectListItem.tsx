import React, { useContext } from "react";
import { Project } from "../@types";
import LineBoxWrapper from "./common/LineBoxWrapper";
import { Box, Button, styled, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import getIdFromIri from "../utils/getIdFromIri";
import { UserProfile } from "./user/UserProfiles";
import LanguageContext from "../LanguageContext";
import t from "./i18n";
import { calculateTimeDifference } from "../utils/TimeUtils";

interface Props {
  project: Project;
}

const CenteredSpacedOutBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
}));

const LinkToProject = styled(Link)(() => ({
  color: "white",
  textDecoration: "none",
  paddingRight: "16px"
}));

const ActionButton = styled(Button)(() => ({
  padding: 0,
  color: "black",
  backgroundColor: "white"
}));

const ProjectListItem: React.FC<Props> = ({ project }) => {
  const { language } = useContext(LanguageContext);
  const formattedDate = calculateTimeDifference(project.lastModified!, language);

  return (
    <LineBoxWrapper>
      <CenteredSpacedOutBox>
        <Box width={300}>
          <Typography variant={"body1"} color={"white"}>
            {project.label}
          </Typography>
        </Box>
        <Box width={150}>
          <Typography variant={"body2"} color={"white"}>
            {formattedDate}
          </Typography>
        </Box>
        <UserProfile user={project.lastEditor} />
        <ActionButton
          variant="contained"
          startIcon={<SettingsIcon sx={{ marginLeft: "16px" }} />}
        >
          <LinkToProject to={getIdFromIri(project.uri)} state={{ project }}>
            <Typography variant={"subtitle2"} color={"black"}>
              {t`manage`}
            </Typography>
          </LinkToProject>
        </ActionButton>
      </CenteredSpacedOutBox>
    </LineBoxWrapper>
  );
};

export default ProjectListItem;
