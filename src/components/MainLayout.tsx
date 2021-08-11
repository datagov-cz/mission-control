import React, { Suspense } from "react";
import { Box } from "@material-ui/core";

import Header from "./Header";
import Footer from "./Footer";
import BackdropGrey from "./BackdropGrey";
import RouteComponentRenderer from "./RouteComponentRenderer";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./Errors";

const MainLayout: React.FC = () => {
  return (
    <BackdropGrey>
      <Header />
      <Box display="flex" flexGrow={1} flexDirection="column">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<></>}>
            <RouteComponentRenderer />
          </Suspense>
        </ErrorBoundary>
      </Box>
      <Footer />
    </BackdropGrey>
  );
};

export default MainLayout;
