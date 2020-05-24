import React from 'react'
import { Typography, Container, Box } from '@material-ui/core'

import t, { Namespace } from 'app/components/i18n'
import RouteLink from 'app/components/RouteLink'
import Routes from 'app/routes'
import WorkspaceName from './WorkspaceName'
import WorkspaceInformation from './WorkspaceInformation'
import WorkspaceDangerZone from './WorkspaceDangerZone'
import WorkspaceVocabularies from './WorkspaceVocabularies'

const WorkspaceDetail: React.FC = () => (
  <Namespace.Provider value="workspaces">
    <Container className="Workspaces">
      <Box height="30px"></Box>
      <Typography variant="body1" gutterBottom>
        <RouteLink routeName={Routes.Workspaces}>
          &larr; {t`workspaces`}
        </RouteLink>
      </Typography>
      <Typography variant="h4" paragraph>
        <WorkspaceName />
      </Typography>
      <WorkspaceInformation />
      <Box my={3} />
      <WorkspaceVocabularies />
      <Box my={3} />
      <WorkspaceDangerZone />
    </Container>
  </Namespace.Provider>
)

export default WorkspaceDetail
