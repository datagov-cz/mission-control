import React from "react";
import { useProjectViaID } from "../../api/ProjectAPI";
import { Project as IProject } from "../../@types";
import { useLocation, useParams } from "react-router-dom";
import { Box, Button, styled, Typography } from "@mui/material";
import t, { Namespace } from "../i18n";
import { CenteredSpacedOutBox } from "../common/CenteredSpacedOutBox";

interface ProjectDetailInterface {
  project: IProject;
}


const Project: React.FC = () => {
  let location = useLocation();
  if (location.state?.project) {
    return <ProjectDetail project={location.state.project} />;
  }
  return <ProjectDetailFetch />;
};

const ActionButton = styled(Button)(() => ({
  // padding: 8,
  color: "white",
  background: "linear-gradient(90deg, #2C397E, 10.42%, #1B96B9 100%)",
  "&:hover": {
    color: "white",
    background: "linear-gradient(90deg, #2C397E, 10.42%, #1B96B9 100%)"
  }
}));

const ProjectDetail: React.FC<ProjectDetailInterface> = ({ project }) => {
  return (
    <Namespace.Provider value={"workspaces"}>
      <Typography variant="h5">{project.label}</Typography>
      <CenteredSpacedOutBox width={500}>
        <Box flex={1}>
          <ActionButton variant="contained" onClick={() => console.log("Edit terms")}>
            <Typography variant={"subtitle2"}>{t`editTerms`}</Typography>
          </ActionButton>
        </Box>
        <Box flex={1}>
          <ActionButton variant="contained" onClick={() => console.log("Edit relations")}>
            <Typography variant={"subtitle2"}>{t`editRelations`}</Typography>
          </ActionButton>
        </Box>
        <Box flex={1}>
          <ActionButton variant="contained" onClick={() => console.log("Edit relations")}>
            <Typography variant={"subtitle2"}>{t`publish`}</Typography>
          </ActionButton>
        </Box>
      </CenteredSpacedOutBox>


    </Namespace.Provider>
  );
};

const ProjectDetailFetch: React.FC = () => {
  let params = useParams();
  const id = params["*"] ?? "";
  const { data, isLoading, isSuccess } = useProjectViaID(id);
  if (isLoading) return <Typography variant={"h4"}>{t`loading`}</Typography>;
  if (!isSuccess) return <h2>It went wrong</h2>;
  return <ProjectDetail project={data} />;
};

export default Project;
