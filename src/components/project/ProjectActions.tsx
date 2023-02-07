import React from "react";
import { CenteredSpacedOutBox } from "../common/CenteredSpacedOutBox";
import { Box } from "@mui/material";
import EditTermsButton from "./buttons/EditTermsButton";
import EditRelationsButton from "./buttons/EditRelationsButton";
import PublishButton from "./buttons/PublishButton";
import { ProjectData } from "../../@types";

interface ProjectActionsProps {
  project: ProjectData
}
const ProjectActions:React.FC<ProjectActionsProps> = ({project}) => {
  return (
    <CenteredSpacedOutBox width={700}>
      <Box flex={1}>
        <EditTermsButton project={project} />
      </Box>
      <Box flex={1}>
        <EditRelationsButton project={project} />
      </Box>
      <Box flex={1}>
        <PublishButton project={project} />
      </Box>
    </CenteredSpacedOutBox>
  );
};
export default ProjectActions;
