import { useQuery } from "@tanstack/react-query";
import { BaseVocabularyData } from "../@types";
import { getVocabulariesUrl } from "./endpoints";
import Ajax from "../utils/Ajax";

const getVocabularies = (): Promise<BaseVocabularyData[]> =>
  Ajax.get(getVocabulariesUrl()).then((resp) => resp.data);

export const useVocabularies = () => {
  return useQuery(["vocabularies"], getVocabularies);
};
