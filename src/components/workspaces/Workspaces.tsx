import React, { Suspense } from "react";
import { Typography, Container, Box, styled } from "@mui/material";

import t, { Namespace } from "components/i18n";
import Title from "components/Title";

import WorkspacesTable from "./WorkspacesTable";
import AddWorkspace from "./AddWorkspace";

const FullHeightContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
});

const Workspaces: React.FC = () => {
  return (
    <Namespace.Provider value="workspaces">
      <Title id="workspaces.workspaces" />
      <FullHeightContainer className="Workspaces">
        <Box height="30px"></Box>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Typography variant="h4" paragraph>{t`workspaces`}</Typography>
          <AddWorkspace />
        </Box>
        <Suspense fallback={<h1>Loading...</h1>}>
          <WorkspacesTable />
        </Suspense>
      </FullHeightContainer>
    </Namespace.Provider>
  );
};

export default Workspaces;
