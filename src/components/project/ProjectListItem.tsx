import React from "react";
import { Project } from "../../@types";
import LineBoxWrapper from "../common/LineBoxWrapper";
import { Box, Typography } from "@mui/material";
import { UserProfile } from "../user/UserProfiles";
import { CenteredSpacedOutBox } from "../common/CenteredSpacedOutBox";
import LastEdited from "./LastEdited";
import ManageProjectButton from "./buttons/ManageProjectButton";

interface Props {
  project: Project;
}

const ProjectListItem: React.FC<Props> = ({ project }) => {
  return (
    <LineBoxWrapper>
      <CenteredSpacedOutBox>
        <Box flex={2}>
          <Typography variant={"body1"} color={"white"}>
            {project.label}
          </Typography>
        </Box>
        <Box flex={1}>
          <LastEdited lastModified={project.lastModified!} />
        </Box>
        <Box flex={1}>
          <UserProfile user={project.lastEditor} />
        </Box>
        <Box flex={1} sx={{ textAlign: "right" }}>
          <ManageProjectButton project={project} />
        </Box>
      </CenteredSpacedOutBox>
    </LineBoxWrapper>
  );
};

export default ProjectListItem;
