import { COMPONENTS } from "app/variables";
import { Tool, Iri } from "@types";

const buildQueryString = (vocabularyIris: Iri[]) => {
  return vocabularyIris.map((vocab) => `vocabulary=${vocab}`).join("&");
};

const tools: Tool[] = [
  {
    key: "editTerms",
    getUrl: (workspaceIri, workspacesIris) => {
      const queryString = buildQueryString(workspacesIris);
      const path = COMPONENTS["al-termit"].meta["workspace-path"].replace(
        "%WORKSPACE_IRI%",
        workspaceIri
      );
      return `${COMPONENTS["al-termit"].url}${path}&${queryString}`;
    },
  },
  {
    key: "editRelations",
    getUrl: (workspaceIri, workspacesIris) => {
      const queryString = buildQueryString(workspacesIris);
      const path = COMPONENTS["al-ontographer"].meta["workspace-path"].replace(
        "%WORKSPACE_IRI%",
        workspaceIri
      );
      return `${COMPONENTS["al-ontographer"].url}${path}&${queryString}`;
    },
  },
];

export default tools;
