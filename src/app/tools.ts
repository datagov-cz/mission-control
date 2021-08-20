import { COMPONENTS } from "app/variables";
import { Tool } from "@types";

const tools: Tool[] = [
  {
    key: "editTerms",
    getUrl: (workspaceIri) => {
      const path = COMPONENTS["al-termit"].meta["workspace-path"].replace(
        "%WORKSPACE_IRI%",
        workspaceIri
      );
      return `${COMPONENTS["al-termit"].url}${path}`;
    },
  },
  {
    key: "editRelations",
    getUrl: (workspaceIri) => {
      const path = COMPONENTS["al-ontographer"].meta["workspace-path"].replace(
        "%WORKSPACE_IRI%",
        workspaceIri
      );
      return `${COMPONENTS["al-ontographer"].url}${path}`;
    },
  },
];

export default tools;
