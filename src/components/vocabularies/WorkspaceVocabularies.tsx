import React from 'react'
import { Typography, Box } from '@material-ui/core'

import t from 'components/i18n'
import VocabulariesTable from './VocabulariesTable'
import AddVocabulary from './AddVocabulary'

const WorkspaceVocabularies: React.FC = () => (
  <>
    <Box display="flex" flexDirection="row" justifyContent="space-between">
      <Typography variant="h5" paragraph>
        {t`vocabularies`}
      </Typography>
      <AddVocabulary />
    </Box>
    <VocabulariesTable />
  </>
)

export default WorkspaceVocabularies
