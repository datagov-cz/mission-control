import { useQuery } from "@tanstack/react-query";
import Ajax from "../utils/Ajax";
import { getAddVocabularyUrl, getProjectsUrl, getProjectUrl } from "./endpoints";
import { BaseVocabularyData, Id, Project, ProjectData } from "../@types";
import getIdFromIri from "../utils/getIdFromIri";
import getIdFromResponse from "../utils/getIdFromResponse";

const getProjects = (): Promise<Project[]> =>
  Ajax.get(getProjectsUrl()).then((resp) => resp.data).then((data) => data.sort((a: Project, b: Project) => {
    return Number(b.lastModified) - Number(a.lastModified);
  }));

const getProject = (id: Id): Promise<ProjectData> => {
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


export const createVocabularyProjectPromise = (vocabulary: BaseVocabularyData):Promise<any> => {
  return new Promise((myResolve, myReject) => {
    Ajax.post(getProjectsUrl(), { label: vocabulary.label }).then(
      (response) => {
        const id = getIdFromResponse(response);
        Ajax.post(getAddVocabularyUrl(id, vocabulary.basedOnVersion), {
          vocabularyUri: vocabulary.basedOnVersion,
          readOnly: false
        }).then(
          () => myResolve(id)
        );
      }).catch(reason => myReject(reason));
  });
};
