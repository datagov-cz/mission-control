import React from "react";
import { CenteredSpacedOutBox } from "../common/CenteredSpacedOutBox";
import { Box } from "@mui/material";
import EditTermsButton from "./buttons/EditTermsButton";
import EditRelationsButton from "./buttons/EditRelationsButton";
import PublishButton from "./buttons/PublishButton";
import { ProjectData } from "../../@types";
import DeleteButton from "./buttons/DeleteButton";

interface ProjectActionsProps {
  project: ProjectData;
}

//TODO: Rewrite the buttons in a way which would be more reusable -> passing handler functions
const ProjectActions: React.FC<ProjectActionsProps> = ({ project }) => {
  return (
    <CenteredSpacedOutBox>
      <Box flex={1}>
        <EditTermsButton project={project} />
      </Box>
      <Box flex={1}>
        <EditRelationsButton project={project} />
      </Box>
      <Box flex={1}>
        <PublishButton project={project} />
      </Box>
      <Box flex={1}>
        <DeleteButton project={project} />
      </Box>
    </CenteredSpacedOutBox>
  );
};
export default ProjectActions;
