import React, { useContext } from "react";
import { Project } from "../../@types";
import LineBoxWrapper from "../common/LineBoxWrapper";
import { Box, styled, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import getIdFromIri from "../../utils/getIdFromIri";
import { UserProfile } from "../user/UserProfiles";
import LanguageContext from "../../LanguageContext";
import t from "../i18n";
import { calculateTimeDifference } from "../../utils/TimeUtils";
import { CenteredSpacedOutBox } from "../common/CenteredSpacedOutBox";
import { ActionButton } from "../common/ActionButton";

interface Props {
  project: Project;
}

const LinkToProject = styled(Link)(() => ({
  color: "white",
  textDecoration: "none"
}));


const ProjectListItem: React.FC<Props> = ({ project }) => {
  const { language } = useContext(LanguageContext);
  const formattedDate = calculateTimeDifference(project.lastModified!, language);

  return (
    <LineBoxWrapper>
      <CenteredSpacedOutBox>
        <Box flex={2}>
          <Typography variant={"body1"} color={"white"}>
            {project.label}
          </Typography>
        </Box>
        <Box flex={1}>
          <Typography variant={"body2"} color={"white"}>
            {formattedDate}
          </Typography>
        </Box>
        <Box flex={1}>
          <UserProfile user={project.lastEditor} />
        </Box>
        <Box flex={1} sx={{ textAlign: "right" }}>
          <LinkToProject to={getIdFromIri(project.uri)} state={{ project }}>
            <ActionButton
              variant="contained"
              startIcon={<SettingsIcon sx={{ marginLeft: "16px" }} />}
            >
              <Typography variant={"subtitle2"} color={"black"} sx={{ marginRight: "16px" }}>
                {t`manage`}
              </Typography>
            </ActionButton>
          </LinkToProject>
        </Box>
      </CenteredSpacedOutBox>
    </LineBoxWrapper>
  );
};

export default ProjectListItem;
