import { Grid } from "@mui/material";
import React from "react";
import { ProjectData } from "../../@types";
import DeleteButton from "./buttons/DeleteButton";
import EditRelationsButton from "./buttons/EditRelationsButton";
import EditTermsButton from "./buttons/EditTermsButton";
import PublishButton from "./buttons/PublishButton";

interface ProjectActionsProps {
  project: ProjectData;
  disable: boolean;
}

//TODO: Rewrite the buttons in a way which would be more reusable -> passing handler functions
const ProjectActions: React.FC<ProjectActionsProps> = ({
  project,
  disable,
}) => {
  const disabled = project.vocabularyContexts.length === 0 || disable;
  return (
    <Grid container spacing={2}>
      <Grid item md={2}>
        <EditTermsButton project={project} disabled={disabled} />
      </Grid>
      <Grid item md={2}>
        <EditRelationsButton project={project} disabled={disabled} />
      </Grid>
      <Grid item md={2}>
        <PublishButton project={project} disabled={disabled} />
      </Grid>
      <Grid item md={2}>
        <DeleteButton project={project} disabled={disable} />
      </Grid>
      {/* {CHECKIT_URL && (
        <Grid item md={2}>
          <CheckItButton project={project} disabled={disable} />
        </Grid>
      )} */}
    </Grid>
  );
};
export default ProjectActions;
