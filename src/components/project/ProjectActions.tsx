import React from "react";
import { Grid } from "@mui/material";
import EditTermsButton from "./buttons/EditTermsButton";
import EditRelationsButton from "./buttons/EditRelationsButton";
import PublishButton from "./buttons/PublishButton";
import { ProjectData } from "../../@types";
import DeleteButton from "./buttons/DeleteButton";
import { CHECKIT_URL } from "../../app/variables";
import CheckItButton from "./buttons/CheckItButton";

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
      {CHECKIT_URL && (
        <Grid item md={2}>
          <CheckItButton project={project} disabled={disable} />
        </Grid>
      )}
    </Grid>
  );
};
export default ProjectActions;
