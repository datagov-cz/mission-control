import {
  BrowserRouter,
  Routes as Switch,
  Route,
  Navigate,
  useLocation,
  matchPath,
} from "react-router-dom";

import Routes from "app/routes";
import { PUBLIC_PATH } from "app/variables";

import MainLayout from "./MainLayout";
import Workspace from "./workspaces/Workspace";
import Workspaces from "./workspaces/Workspaces";
import { Error404 } from "./Errors";
import { useEffect, useState } from "react";

/**
 * This component facilitates initial loading of data when particular routes
 * are accessed directly via URL. Subsequent data management during page transitions
 * is handled on demand to facilitate the render-as-you-fetch strategy for optimal UX.
 */
const InitialLoad: React.FC = () => {
  const [initialized, setInitialized] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!initialized) {
      const workspacesMatch = matchPath(
        { path: Routes.Workspaces },
        location.pathname
      );
      if (workspacesMatch) {
        Routes.Workspaces.onEnter();
      }

      const workspaceMatch = matchPath(
        { path: Routes.Workspace },
        location.pathname
      );
      if (workspaceMatch) {
        Routes.Workspace.onEnter(workspaceMatch.params as { id: string });
      }

      setInitialized(true);
    }
  }, [initialized, location]);
  return null;
};

const Router: React.FC = () => (
  <BrowserRouter>
    <InitialLoad />
    <MainLayout>
      <Switch basename={PUBLIC_PATH}>
        <Route path="/">
          <Navigate to="/workspaces" />
        </Route>
        <Route path="/workspaces" element={<Workspaces />} />
        <Route path="/workspace/:id" element={<Workspace />} />
        <Route path="*" element={<Error404 />} />
      </Switch>
    </MainLayout>
  </BrowserRouter>
);

export default Router;
