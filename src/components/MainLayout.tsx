import React, { Suspense } from "react";
import { Box } from "@material-ui/core";

import Header from "./Header";
import Footer from "./Footer";
import BackdropGrey from "./BackdropGrey";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./Errors";

const MainLayout: React.FC = ({ children }) => {
  return (
    <BackdropGrey>
      <Header />
      <Box display="flex" flexGrow={1} flexDirection="column">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<>loading</>}>{children}</Suspense>
        </ErrorBoundary>
      </Box>
      <Footer />
    </BackdropGrey>
  );
};

export default MainLayout;
