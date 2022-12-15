import { useQuery } from "@tanstack/react-query";
import { AddVocabularyPayload, BaseVocabularyData } from "../@types";
import { getAddVocabularyUrl, getVocabulariesUrl } from "./endpoints";
import Ajax from "../utils/Ajax";

const getVocabularies = (): Promise<BaseVocabularyData[]> =>
  Ajax.get(getVocabulariesUrl()).then((resp) => resp.data);

export const useVocabularies = () => {
  return useQuery(["vocabularies"], getVocabularies);
};

export const createVocabulary = (payload: AddVocabularyPayload): Promise<any> => {
  return new Promise((myResolve, myReject) => {
    Ajax.post(
      getAddVocabularyUrl(
        payload.projectId,
        payload.vocabularyIri,
        payload.label
      ), {}
    )
      .then((data) => myResolve(data))
      .catch((reason) => myReject(reason));
  })
};
