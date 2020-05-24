import React from 'react'
import { useSelector } from 'react-redux'
import { Typography } from '@material-ui/core'

import t from 'app/components/i18n'
import { getWorkspace, getWorkspacesLoading } from 'workspaces/selectors'
import VocabulariesTable from './VocabulariesTable'

const WorkspaceVocabularies: React.FC = () => (
  <>
    <Typography variant="h5" paragraph>
      {t`vocabularies`}
    </Typography>
    <VocabulariesTable />
  </>
)

export default WorkspaceVocabularies
