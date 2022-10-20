import { useQuery } from "@tanstack/react-query";
import Ajax from "../utils/Ajax";
import { getProjectsUrl, getProjectUrl } from "./endpoints";
import { Id, Project } from "../@types";
import getIdFromIri from "../utils/getIdFromIri";

const getProjects = (): Promise<Project[]> =>
  Ajax.get(getProjectsUrl()).then((resp) => resp.data).then((data) => data.sort((a: Project, b: Project) => {
    return Number(b.lastModified) - Number(a.lastModified);
  }));

const getProject = (id: Id): Promise<Project> => {
  return Ajax.get(getProjectUrl(id)).then((resp) => resp.data);
};

export const useProjects = () => {
  return useQuery(["projects"], getProjects);
};

export const useProject = (project: Project) => {
  return useQuery(["projects", project.uri], () =>
    getProject(getIdFromIri(project.uri))
  );
};

export const useProjectViaID = (uri: string) => {
  return useQuery(["projectsID", uri], () => getProject(getIdFromIri(uri)));
};
