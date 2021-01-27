import React, { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useObservableSuspense } from 'observable-hooks'
import {
  TextField,
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Tabs,
  Tab,
  Button,
  List,
  ListItem,
  ListItemText,
  InputAdornment,
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

import { AddVocabularyPayload, BaseVocabularyData } from '@types'
import vocabularyTypes from 'app/vocabularyTypes.json'

import t from 'components/i18n'
import SubmitButton from 'components/form/SubmitButton'
import Form from 'components/form/Form'
import Hidden from 'components/form/Hidden'
import FormTextField from 'components/form/TextField'
import {
  addVocabulary,
  fetchWorkspaceVocabularies,
  vocabulariesResource,
  workspaceVocabulariesResource,
} from 'data/vocabularies'
import { workspaceResource } from 'data/workspaces'

type ImportVocabularyProps = {
  setTabIndex: (index: number) => void
  onClose: () => void
}

const ImportVocabulary: React.FC<ImportVocabularyProps> = ({
  setTabIndex,
  onClose,
}) => {
  const vocabularies = useObservableSuspense(vocabulariesResource)
  const workspaceVocabularies = useObservableSuspense(
    workspaceVocabulariesResource
  )
  const workspace = useObservableSuspense(workspaceResource)
  const [needle, setNeedle] = useState('')
  const [
    selectedVocabulary,
    setSelectedVocabulary,
  ] = useState<BaseVocabularyData>()

  const workspaceVocabulariesUris = workspaceVocabularies.map(
    (vocabulary) => vocabulary.vocabulary
  )

  const availableVocabularies = vocabularies.filter(
    (vocabulary) =>
      !workspaceVocabulariesUris.includes(vocabulary.basedOnVocabularyVersion)
  )

  // Look for matching vocabularies - both URI and label are considered
  const needleRegex = new RegExp(needle, 'gi')
  const filteredVocabularies = availableVocabularies.filter(
    (vocabulary) =>
      needleRegex.test(vocabulary.label) ||
      needleRegex.test(vocabulary.basedOnVocabularyVersion)
  )

  // Handles search input changes
  const handleNeedleChange = useCallback((event) => {
    setNeedle(event.target.value)
    setSelectedVocabulary(undefined)
  }, [])

  // Handles selecting a vocabulary from the list
  const handleVocabularyClick = useCallback(
    (vocabulary: BaseVocabularyData) => {
      setSelectedVocabulary(vocabulary)
    },
    []
  )

  // Handles final import action, triggers backend request
  const handleImportClick = useCallback(
    (readOnly: boolean) => {
      addVocabulary({
        workspaceId: workspace!.id,
        vocabularyIri: selectedVocabulary!.basedOnVocabularyVersion,
        readOnly,
      }).subscribe(() => {
        fetchWorkspaceVocabularies(workspace!.id)
        onClose()
      })
    },
    [workspace, selectedVocabulary, onClose]
  )

  // Handles switching to the second tab
  const handleTabSwitch = useCallback(() => setTabIndex(1), [setTabIndex])

  return (
    <>
      <TextField
        autoComplete="off"
        label={t`search`}
        onChange={handleNeedleChange}
        autoFocus
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      {selectedVocabulary && (
        <>
          <ListItem>
            <ListItemText
              primary={selectedVocabulary.label}
              secondary={selectedVocabulary.basedOnVocabularyVersion}
            />
          </ListItem>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            size="large"
            onClick={() => handleImportClick(true)}
          >
            {t`importVocabularyForReadOnly`}
          </Button>
          <Box my={1} />
          <Button
            color="primary"
            variant="contained"
            fullWidth
            size="large"
            onClick={() => handleImportClick(false)}
          >
            {t`importVocabularyForReadAndWrite`}
          </Button>
        </>
      )}
      {filteredVocabularies.length > 0 && !selectedVocabulary && (
        <Box style={{ height: 380, overflowY: 'scroll' }}>
          <List>
            {filteredVocabularies.map((vocabulary) => (
              <ListItem
                button
                key={vocabulary.basedOnVocabularyVersion}
                onClick={() => handleVocabularyClick(vocabulary)}
              >
                <ListItemText
                  primary={vocabulary.label}
                  secondary={vocabulary.basedOnVocabularyVersion}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
      {filteredVocabularies.length < 1 && !selectedVocabulary && (
        <Button
          onClick={handleTabSwitch}
          fullWidth
        >{t`vocabularyNotFoundCreateNew`}</Button>
      )}
    </>
  )
}

type CreateVocabularyProps = {
  onClose: () => void
}

const CreateVocabulary: React.FC<CreateVocabularyProps> = ({ onClose }) => {
  const workspace = useObservableSuspense(workspaceResource)

  const form = useForm()

  const onSubmit = useCallback(
    (payload: AddVocabularyPayload) => {
      addVocabulary(payload).subscribe(() => {
        fetchWorkspaceVocabularies(workspace.id)
        onClose()
      })
    },
    [onClose, workspace]
  )

  const [vocabularyTypeLabel, setVocabularyType] = useState(
    vocabularyTypes[0].label
  )

  const vocabularyType = vocabularyTypes.find(
    (v) => v.label === vocabularyTypeLabel
  )

  // Handles vocabulary type change when user selects radio option, resets form
  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedTypeLabel = (event.target as HTMLInputElement).value
    const selectedType = vocabularyTypes.find(
      (v) => v.label === selectedTypeLabel
    )
    setVocabularyType(selectedTypeLabel)
    form.reset({
      vocabularyIri: selectedType?.prefix,
      label: form.getValues('label'),
    })
  }

  return (
    <>
      <Box my={1} />
      <FormControl component="fieldset">
        <FormLabel component="legend">{t`vocabularyType`}</FormLabel>
        <RadioGroup
          name="vocabularyType"
          value={vocabularyTypeLabel}
          onChange={handleTypeChange}
        >
          {vocabularyTypes.map((vocType) => (
            <FormControlLabel
              key={vocType.label}
              value={vocType.label}
              control={<Radio />}
              label={vocType.label}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Box m={1} />
      <Form form={form}>
        <Hidden name="workspaceId" value={workspace.id} />
        <Hidden name="readOnly" value="false" />
        <FormTextField
          name="vocabularyIri"
          label={t`vocabularyIri`}
          defaultValue={vocabularyType?.prefix}
          rules={{
            pattern: {
              value: new RegExp(vocabularyType?.regex!),
              message: vocabularyType?.regex!,
            },
          }}
        />
        <FormTextField
          name="label"
          label={t`vocabularyLabel`}
          rules={{
            required: 'common.errorRequired',
          }}
        />
        <SubmitButton onClick={onSubmit}>{t`addVocabulary`}</SubmitButton>
      </Form>
    </>
  )
}

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
            <ImportVocabulary setTabIndex={setTabIndex} onClose={onClose} />
          </TabPanel>
          <TabPanel index={1} currentIndex={tabIndex}>
            <CreateVocabulary onClose={onClose} />
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
