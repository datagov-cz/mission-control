import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { setProcessEnv, Auth } from "@opendata-mvcr/assembly-line-shared";
import { ErrorBoundary } from "react-error-boundary";

setProcessEnv(process.env);
const App = React.lazy(() => import("./App"));

const AuthErrorFallback = () => (
  <>Unable to authenticate user, identity service may be down</>
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={AuthErrorFallback}>
      <Auth>
        <App />
      </Auth>
    </ErrorBoundary>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
