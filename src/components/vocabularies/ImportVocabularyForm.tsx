import React, { useState, useCallback } from 'react'
import { useObservableSuspense } from 'observable-hooks'
import {
  TextField,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  InputAdornment,
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

import { BaseVocabularyData } from '@types'

import t from 'components/i18n'
import {
  addVocabulary,
  fetchWorkspaceVocabularies,
  vocabulariesResource,
  workspaceVocabulariesResource,
} from 'data/vocabularies'
import { workspaceResource } from 'data/workspaces'

type ImportVocabularyFormProps = {
  setTabIndex: (index: number) => void
  onClose: () => void
}

const ImportVocabularyForm: React.FC<ImportVocabularyFormProps> = ({
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

export default ImportVocabularyForm
