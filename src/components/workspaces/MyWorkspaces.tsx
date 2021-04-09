import React, { Suspense } from "react";
import { Typography, Container, Box } from "@material-ui/core";

import t, { Namespace } from "components/i18n";
import Title from "components/Title";

import WorkspacesTable from "./WorkspacesTable";
import AddWorkspace from "./AddWorkspace";
import RouteLink from "components/RouteLink";
import Routes from "app/routes";

const Workspaces: React.FC = () => {
  return (
    <Namespace.Provider value="workspaces">
      <Title id="workspaces.myWorkspaces" />
      <Container className="Workspaces">
        <Box height="30px"></Box>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Typography variant="h4" paragraph>{t`myWorkspaces`}</Typography>
          <AddWorkspace />
        </Box>
        <Suspense fallback={<h1>Loading...</h1>}>
          <WorkspacesTable currentUserOnly={true} />
        </Suspense>
        <Box py={2}>
          <RouteLink route={Routes.Workspaces}>
            {t`showAllWorkspaces`}
          </RouteLink>
        </Box>
      </Container>
    </Namespace.Provider>
  );
};

export default Workspaces;
