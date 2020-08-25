import React from 'react'
import { Typography, Box } from '@material-ui/core'

import t from 'app/components/i18n'
import VocabulariesTable from './VocabulariesTable'
import AddExistingVocabulary from './AddExistingVocabulary'
import AddVocabulary from './AddVocabulary'

const WorkspaceVocabularies: React.FC = () => (
  <>
    <Box display="flex" flexDirection="row" justifyContent="space-between">
      <Typography variant="h5" paragraph>
        {t`vocabularies`}
      </Typography>
      <Box display="flex">
        <AddExistingVocabulary />
        <Box m={1} />
        <AddVocabulary />
      </Box>
    </Box>
    <VocabulariesTable />
  </>
)

export default WorkspaceVocabularies
