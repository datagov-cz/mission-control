import React from "react";
import { useProjects } from "../api/ProjectAPI";
import { Container, Typography } from "@mui/material";
import ProjectListItem from "./ProjectListItem";
import { Project } from "../@types";

const Projects: React.FC = () => {
  const { data = [], isLoading } = useProjects();
  if (isLoading) return <h2>Loading...</h2>;
  return (
    <Container>
      <Typography variant={"h4"}>Projects</Typography>
      {data.map((project: Project) => (
        <ProjectListItem project={project} key={project.uri} />
      ))}
    </Container>
  );
};

export default Projects;
