import React from 'react'
import { Typography, Container, Box } from '@material-ui/core'

import t, { Namespace } from 'app/components/i18n'
import RouteLink from 'app/components/RouteLink'
import Routes from 'app/routes'
import WorkspaceName from './WorkspaceName'
import WorkspaceInformation from './WorkspaceInformation'
import WorkspaceActions from './WorkspaceActions'
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
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Typography variant="h4" paragraph>
          <WorkspaceName />
        </Typography>
        <WorkspaceActions />
      </Box>
      <WorkspaceInformation />
      <Box my={3} />
      <WorkspaceVocabularies />
    </Container>
  </Namespace.Provider>
)

export default WorkspaceDetail
