import React from "react";
import LineBoxWrapper from "../common/LineBoxWrapper";
import { Box, Typography } from "@mui/material";
import { UserProfile } from "../user/UserProfiles";
import { CenteredSpacedOutBox } from "../common/CenteredSpacedOutBox";
import LastEdited from "./LastEdited";
import ManageProjectButton from "./buttons/ManageProjectButton";
import { ProjectDetailProps } from "./Project";
import ExpandableMenuButton from "./buttons/ExpandableMenuButton";

const ProjectListItem: React.FC<ProjectDetailProps> = ({ project }) => {
  return (
    <LineBoxWrapper>
      <CenteredSpacedOutBox>
        <Box flex={3}>
          <Typography variant={"body1"} color={"white"}>
            {project.label}
          </Typography>
        </Box>
        <Box flex={1} sx={{ color: "white" }}>
          <LastEdited lastModified={project.lastModified!} />
        </Box>
        <Box flex={1}>
          <UserProfile user={project.lastEditor} />
        </Box>
        <Box flex={1} sx={{ textAlign: "right", display: "flex" }}>
          <ManageProjectButton
            project={project}
            textColor={"black"}
            backgroundColor={"white"}
          />
          <ExpandableMenuButton project={project} />
        </Box>
      </CenteredSpacedOutBox>
    </LineBoxWrapper>
  );
};

export default ProjectListItem;
