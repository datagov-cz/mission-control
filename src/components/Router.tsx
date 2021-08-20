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
  // substring path prefix in case the app runs on a subpath
  const path = location.pathname.startsWith(PUBLIC_PATH)
    ? location.pathname.substring(PUBLIC_PATH.length)
    : location.pathname;

  useEffect(() => {
    if (!initialized) {
      const workspacesMatch = matchPath({ path: Routes.Workspaces }, path);
      if (workspacesMatch) {
        Routes.Workspaces.onEnter();
      }

      const workspaceMatch = matchPath({ path: Routes.Workspace }, path);
      if (workspaceMatch) {
        Routes.Workspace.onEnter(workspaceMatch.params as { id: string });
      }

      setInitialized(true);
    }
  }, [initialized, path]);
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
        <Route>
          <Error404 />
        </Route>
      </Switch>
    </MainLayout>
  </BrowserRouter>
);

export default Router;
