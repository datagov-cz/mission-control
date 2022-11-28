import { useQuery } from "@tanstack/react-query";
import Ajax from "../utils/Ajax";
import {
  getAddVocabularyUrl,
  getProjectPublishUrl,
  getProjectsUrl,
  getProjectUrl,
} from "./endpoints";
import {
  BaseVocabularyData,
  Id,
  Project,
  ProjectData,
  UserData,
} from "../@types";
import getIdFromIri from "../utils/getIdFromIri";
import getIdFromResponse from "../utils/getIdFromResponse";
import Projects from "../components/project/Projects";
import { getEditTermLink } from "../utils/QueryUtil";
import project from "../components/project/Project";

const getProjects = (): Promise<Project[]> =>
  Ajax.get(getProjectsUrl())
    .then((resp) => resp.data)
    .then((data) =>
      data.sort((a: Project, b: Project) => {
        return Number(b.lastModified) - Number(a.lastModified);
      })
    );

const getProject = (id: Id): Promise<ProjectData> => {
  return Ajax.get(getProjectUrl(id)).then((resp) => resp.data);
};

export const useProjects = () => {
  return useQuery(["projects"], getProjects);
};

export const getLastEditedProject = (): ProjectData => {
  //Just mock TODO: call API or calculate from available data
  const user: UserData = {
    firstName: "Filip",
    id: "id",
    lastName: "Kopecký",
    types: [],
    uri: "uri",
  };
  const project: ProjectData = {
    author: user,
    created: 166738458732,
    //label: "Konference stavebnictví",
    label:
      "Slovník zákona č. 56/2001 Sb. o podmínkách provozu vozidel na pozemních komunikacích a o změně zákona č. 168/1999 Sb., o pojištění odpovědnosti za škodu způsobenou provozem vozidla a o změně některých souvisejících zákonů (zákon o pojištění odpovědnosti z provozu vozidla), ve znění zákona č. 307/1999 Sb. - slovník",
    lastEditor: user,
    lastModified: new Date(1667384634172),
    uri: "https://slovník.gov.cz/datový/pracovní-prostor/pojem/metadatový-kontext/instance-1583624421",
    vocabularyContexts: [],
  };
  return project;
};

export const useProject = (project: Project) => {
  return useQuery(["projects", project.uri], () =>
    getProject(getIdFromIri(project.uri))
  );
};

export const useProjectViaID = (uri: string) => {
  return useQuery(["projectsID", uri], () => getProject(getIdFromIri(uri)));
};

export const createVocabularyProjectPromise = (
  vocabulary: BaseVocabularyData
): Promise<any> => {
  return new Promise((myResolve, myReject) => {
    Ajax.post(getProjectsUrl(), { label: vocabulary.label })
      .then((response) => {
        const id = getIdFromResponse(response);
        Ajax.post(getAddVocabularyUrl(id, vocabulary.basedOnVersion), {
          vocabularyUri: vocabulary.basedOnVersion,
          readOnly: false,
        }).then(() => myResolve(id));
      })
      .catch((reason) => myReject(reason));
  });
};

export const publishProjectPromise = (project: ProjectData): Promise<any> => {
  return new Promise((myResolve, myReject) => {
    Ajax.post(getProjectPublishUrl(getIdFromIri(project.uri)), {})
      .then((data) => myResolve(data))
      .catch((reason) => myReject(reason));
  });
};
