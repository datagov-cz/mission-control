import { fetchWorkspace, fetchWorkspaces } from "data/workspaces";
import {
  fetchVocabularies,
  fetchWorkspaceVocabularies,
} from "data/vocabularies";

const Routes = {
  Workspaces: Object.assign("/workspaces", {
    onEnter: () => {
      fetchWorkspaces();
    },
  }),
  Workspace: Object.assign("/workspace/:id", {
    onEnter: ({ id }: { id: string }) => {
      fetchWorkspace(id);
      fetchWorkspaceVocabularies(id);
      fetchVocabularies();
    },
  }),
} as const;

export default Routes;
