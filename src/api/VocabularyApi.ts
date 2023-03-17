import { useQuery } from "@tanstack/react-query";
import {
  AddVocabularyPayload,
  BaseVocabularyData,
  EditProjectPayload,
  ProjectData,
} from "../@types";
import {
  getAddVocabularyUrl,
  getProjectsUrl,
  getProjectUrl,
  getVocabulariesUrl,
} from "./endpoints";
import Ajax from "../utils/Ajax";
import getIdFromResponse from "../utils/getIdFromResponse";
import getIdFromIri from "../utils/getIdFromIri";

const getVocabularies = (): Promise<BaseVocabularyData[]> =>
  Ajax.get(getVocabulariesUrl()).then((resp) => resp.data);

export const useVocabularies = () => {
  return useQuery(["vocabularies"], getVocabularies);
};

export const createVocabulary = (
  payload: AddVocabularyPayload
): Promise<any> => {
  return new Promise((myResolve, myReject) => {
    Ajax.post(getProjectsUrl(), { label: payload.label }).then((response) => {
      const projectID = getIdFromResponse(response);
      Ajax.post(
        getAddVocabularyUrl(projectID, payload.vocabularyIri, payload.label),
        {}
      )
        .then((data) => myResolve(projectID))
        .catch((reason) => myReject(reason));
    });
  });
};

export const editProjectName = (payload: EditProjectPayload): Promise<any> => {
  return new Promise((myResolve, myReject) => {
    Ajax.putJson(getProjectUrl(getIdFromIri(payload.uri)), payload)
      .then((data) => myResolve(data))
      .catch((reason) => myReject(reason));
  });
};

export const addVocabularyToExistingProject = (
  vocabulary: BaseVocabularyData,
  project: ProjectData
): Promise<any> => {
  return new Promise((myResolve, myReject) => {
    Ajax.post(
      getAddVocabularyUrl(getIdFromIri(project.uri), vocabulary.basedOnVersion),
      {
        vocabularyUri: vocabulary.basedOnVersion,
        readOnly: false,
      }
    ).then(() => myResolve(getIdFromIri(project.uri)));
  });
};

export const createVocabularyToExistingProject = (
  vocabulary: AddVocabularyPayload,
  project: ProjectData
): Promise<any> => {
  return new Promise((myResolve, myReject) => {
    Ajax.post(
      getAddVocabularyUrl(
        getIdFromIri(project.uri),
        vocabulary.vocabularyIri,
        vocabulary.label
      ),
      {
        vocabularyUri: vocabulary.vocabularyIri,
        readOnly: false,
        label: vocabulary.label,
      }
    ).then(() => myResolve(getIdFromIri(project.uri)));
  });
};
