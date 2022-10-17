import React from "react";
import { useProjectViaID } from "../api/ProjectAPI";
import { Project as IProject } from "../@types";
import { useLocation, useParams } from "react-router-dom";

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

const ProjectDetail: React.FC<ProjectDetailInterface> = ({ project }) => {
  return <h2>{project.label}</h2>;
};

const ProjectDetailFetch: React.FC = () => {
  let params = useParams();
  const id = params["*"] ?? "";
  const { data, isLoading, isSuccess } = useProjectViaID(id);
  if (isLoading) return <h2>Loading...</h2>;
  if (!isSuccess) return <h2>It went wrong</h2>;
  return <ProjectDetail project={data} />;
};

export default Project;
