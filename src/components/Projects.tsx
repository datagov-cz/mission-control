import React from "react";
import { useProjects } from "../api/ProjectAPI";
import { Box, Container, Typography } from "@mui/material";
import ProjectListItem from "./ProjectListItem";
import { Project } from "../@types";
import t, { Namespace } from "./i18n";

const Projects: React.FC = () => {
  const { data = [], isLoading } = useProjects();
  if (isLoading) return <Typography variant={"h4"}>{t`loading`}</Typography>
  return (
    <Namespace.Provider value={"workspaces"}>
      <Typography variant={"h4"}>{t`projects`}</Typography>
      {data.map((project: Project) => (
        <ProjectListItem project={project} key={project.uri} />
      ))}
    </Namespace.Provider>
  );
};

export default Projects;
