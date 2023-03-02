import { ProjectData, VocabularyData } from "../@types";
import { COMPONENTS } from "../app/variables";

const buildQueryString = (vocabularyIris: VocabularyData[]) => {
  return vocabularyIris.map((vocab) => `vocabulary=${vocab.uri}`).join("&");
};

export function getEditTermLink(project: ProjectData): string {
  const queryString = buildQueryString(project.vocabularyContexts);
  return `${COMPONENTS["al-termit"].url}/#/?${queryString}`;
}

export function getEditRelationsLink(project: ProjectData): string {
  const queryString = buildQueryString(project.vocabularyContexts);
  return `${COMPONENTS["al-ontographer"].url}?${queryString}`;
}
