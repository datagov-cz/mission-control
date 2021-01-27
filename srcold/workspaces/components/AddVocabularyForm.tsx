import React, { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
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

import Actions from 'app/actions'
import useActionForm from 'app/hooks/useActionForm'
import useDispatchAction from 'app/hooks/useDispatchAction'
import t from 'app/components/i18n'
import SubmitButton from 'app/components/SubmitButton'

import {
  getIsAddVocabularyFormOpen,
  getWorkspace,
  getVocabularies,
} from 'workspaces/selectors'
import { BaseVocabularyData } from 'workspaces/types'

type ImportVocabulary = {
  setTabIndex: (index: number) => void
}

const ImportVocabulary: React.FC<ImportVocabulary> = ({ setTabIndex }) => {
  const dispatch = useDispatch()
  const vocabularies = useSelector(getVocabularies)
  const workspace = useSelector(getWorkspace)
  const [needle, setNeedle] = useState('')
  const [selectedVocabulary, setSelectedVocabulary] = useState<
    BaseVocabularyData
  >()

  const workspaceVocabularies = workspace!.vocabularies.map(
    (vocabulary) => vocabulary.vocabulary
  )

  const availableVocabularies = vocabularies.filter(
    (vocabulary) =>
      !workspaceVocabularies.includes(vocabulary.basedOnVocabularyVersion)
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
      dispatch(
        Actions.Workspaces.addVocabulary.request({
          workspaceId: workspace!.id,
          vocabularyIri: selectedVocabulary!.basedOnVocabularyVersion,
          label: selectedVocabulary!.label,
          readOnly,
        })
      )
    },
    [dispatch, workspace, selectedVocabulary]
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
          <SubmitButton
            onClick={() => handleImportClick(true)}
          >{t`importVocabularyForReadOnly`}</SubmitButton>
          <Box my={1} />
          <SubmitButton
            onClick={() => handleImportClick(false)}
          >{t`importVocabularyForReadAndWrite`}</SubmitButton>
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

const vocabularyTypes = [
  {
    label: 'Datový',
    prefix: 'https://slovník.gov.cz/datový/',
    regex: '^https://slovník.gov.cz/datový/[ěščřžýáíéóúůďťňa-z0-9-]+$',
  },
  {
    label: 'Agendový',
    prefix: 'https://slovník.gov.cz/agendový/',
    regex: '^https://slovník.gov.cz/agendový/[a-z0-9-]+$',
  },
  {
    label: 'Legislativní',
    prefix: 'https://slovník.gov.cz/legislativní/sbírka/',
    regex: '^https://slovník.gov.cz/legislativní/sbírka/[0-9]+/[0-9]+$',
  },
  {
    label: 'Generický',
    prefix: 'https://slovník.gov.cz/generický/',
    regex: '^https://slovník.gov.cz/generický/[ěščřžýáíéóúůďťňa-z0-9-]+$',
  },
]

const CreateVocabulary: React.FC = () => {
  const workspace = useSelector(getWorkspace)
  const { register, errors, onSubmit, reset } = useActionForm(
    Actions.Workspaces.addVocabulary.request
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
    reset({ vocabularyIri: selectedType?.prefix })
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
      <form>
        <input
          type="hidden"
          name="workspaceId"
          value={workspace?.id}
          ref={register}
        />
        <input type="hidden" name="readOnly" value="false" ref={register} />
        <TextField
          autoComplete="off"
          name="vocabularyIri"
          label={t`vocabularyIri`}
          defaultValue={vocabularyType?.prefix}
          inputRef={register({
            pattern: {
              value: new RegExp(vocabularyType?.regex!),
              message: vocabularyType?.regex!,
            },
          })}
          error={!!errors.vocabularyIri}
          helperText={errors.vocabularyIri?.message}
        />
        <TextField
          name="label"
          label={t`vocabularyLabel`}
          inputRef={register({
            required: t`app.errorRequired`,
          })}
          error={!!errors.label}
          helperText={errors.label?.message}
        />
        <SubmitButton onClick={onSubmit}>{t`addVocabulary`}</SubmitButton>
      </form>
    </>
  )
}

const AddVocabularyForm: React.FC = () => {
  const isOpen = useSelector(getIsAddVocabularyFormOpen)
  const closeForm = useDispatchAction(
    Actions.Workspaces.openAddVocabularyForm(false)
  )
  const [tabIndex, setTabIndex] = React.useState(0)
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabIndex(newValue)
  }

  return (
    <Dialog open={isOpen} onClose={closeForm} fullWidth maxWidth="sm">
      <DialogTitle>{t`addVocabulary`}</DialogTitle>
      <DialogContent>
        <Tabs value={tabIndex} onChange={handleChange} variant="fullWidth">
          <Tab label={t`importVocabulary`} />
          <Tab label={t`createVocabulary`} />
        </Tabs>
        <Box style={{ height: 480 }}>
          {tabIndex === 0 && <ImportVocabulary setTabIndex={setTabIndex} />}
          {tabIndex === 1 && <CreateVocabulary />}
        </Box>
        <Box my={1} />
        <Button onClick={closeForm} color="primary" fullWidth size="large">
          {t`app.cancel`}
        </Button>
        <Box my={1} />
      </DialogContent>
    </Dialog>
  )
}

export default AddVocabularyForm
