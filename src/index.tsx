import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { ErrorBoundary } from "react-error-boundary";

import { setProcessEnv, Auth } from "@opendata-mvcr/assembly-line-shared";

setProcessEnv(process.env);

const App = React.lazy(() => import("components/App"));

const AuthErrorFallback = () => (
  <>Unable to authenticate user, identity service may be down</>
);

const rootElement = document.getElementById("app") as HTMLElement;
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={AuthErrorFallback}>
      <Auth>
        <Suspense fallback={""}>
          <App />
        </Suspense>
      </Auth>
    </ErrorBoundary>
  </React.StrictMode>
);
