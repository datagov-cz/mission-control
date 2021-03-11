import React from 'react'
import { Typography, Container, Box } from '@material-ui/core'

import Routes from 'app/routes'

import RouteLink from 'components/RouteLink'
import t, { Namespace } from 'components/i18n'
import WorkspaceName from './WorkspaceName'
import WorkspaceInformation from './WorkspaceInformation'
import WorkspaceActions from './WorkspaceActions'
import WorkspaceVocabularies from 'components/vocabularies/WorkspaceVocabularies'

const Workspace: React.FC = () => {
  return (
    <Namespace.Provider value="workspaces">
      <Container className="Workspaces">
        <Box height="30px"></Box>
        <Typography variant="body1" gutterBottom>
          <RouteLink route={Routes.Default}>&larr; {t`workspaces`}</RouteLink>
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
}

export default Workspace
