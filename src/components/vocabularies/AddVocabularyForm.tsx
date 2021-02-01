import React from 'react'
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Tabs,
  Tab,
  Button,
} from '@material-ui/core'

import t from 'components/i18n'
import ImportVocabularyForm from 'components/vocabularies/ImportVocabularyForm'
import CreateVocabularyForm from 'components/vocabularies/CreateVocabularyForm'

type TabPanelProps = {
  index: number
  currentIndex: number
  children: React.ReactElement
}

const TabPanel: React.FC<TabPanelProps> = ({
  index,
  currentIndex,
  children,
}) => <div hidden={index !== currentIndex}>{children}</div>

type AddVocabularyFormProps = {
  isOpen: boolean
  onClose: () => void
}

const AddVocabularyForm: React.FC<AddVocabularyFormProps> = ({
  isOpen,
  onClose,
}) => {
  const [tabIndex, setTabIndex] = React.useState(0)
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabIndex(newValue)
  }

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{t`addVocabulary`}</DialogTitle>
      <DialogContent>
        <Tabs value={tabIndex} onChange={handleChange} variant="fullWidth">
          <Tab label={t`importVocabulary`} />
          <Tab label={t`createVocabulary`} />
        </Tabs>
        <Box style={{ height: 480 }}>
          <TabPanel index={0} currentIndex={tabIndex}>
            <ImportVocabularyForm setTabIndex={setTabIndex} onClose={onClose} />
          </TabPanel>
          <TabPanel index={1} currentIndex={tabIndex}>
            <CreateVocabularyForm onClose={onClose} />
          </TabPanel>
        </Box>
        <Box my={1} />
        <Button onClick={onClose} color="primary" fullWidth size="large">
          {t`common.cancel`}
        </Button>
        <Box my={1} />
      </DialogContent>
    </Dialog>
  )
}

export default AddVocabularyForm
