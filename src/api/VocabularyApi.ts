import { useQuery } from "@tanstack/react-query";
import { AddVocabularyPayload, BaseVocabularyData } from "../@types";
import {
  getAddVocabularyUrl,
  getProjectsUrl,
  getVocabulariesUrl,
} from "./endpoints";
import Ajax from "../utils/Ajax";
import getIdFromResponse from "../utils/getIdFromResponse";

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
