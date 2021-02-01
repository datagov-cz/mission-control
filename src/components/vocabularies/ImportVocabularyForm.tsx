import React, { useState, useCallback, useMemo } from 'react'
import { useObservableSuspense } from 'observable-hooks'
import FlexSearch from 'flexsearch'
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
import removeDiacritics from 'utils/removeDiacritics'

type IndexedVocabulary = {
  id: number
  normalizedLabel: string
  normalizedIri: string
  vocabulary: BaseVocabularyData
}

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

  const [filteredVocabularies, setFilteredVocabularies] = useState<
    BaseVocabularyData[]
  >(vocabularies)

  const [
    selectedVocabulary,
    setSelectedVocabulary,
  ] = useState<BaseVocabularyData>()

  // Create a search index with fulltext search support optimized for tolerant matching
  const flexSearch = useMemo(() => {
    const index = FlexSearch.create<IndexedVocabulary>({
      encode: 'extra',
      tokenize: 'full',
      threshold: 1,
      resolution: 3,
      doc: {
        id: 'id',
        field: ['normalizedLabel', 'normalizedIri'],
      },
    })
    vocabularies.forEach((vocabulary, id) => {
      index.add({
        id,
        normalizedLabel: removeDiacritics(vocabulary.label),
        normalizedIri: removeDiacritics(vocabulary.basedOnVocabularyVersion),
        vocabulary,
      })
    })
    return index
  }, [vocabularies])

  // Filters out vocabularies that are already present in the workspace
  const filterWorkspaceVocabularies = useCallback(
    (someVocabularies: BaseVocabularyData[]) => {
      const workspaceVocabulariesUris = workspaceVocabularies.map(
        (vocabulary) => vocabulary.vocabulary
      )
      return someVocabularies.filter(
        (vocabulary) =>
          !workspaceVocabulariesUris.includes(
            vocabulary.basedOnVocabularyVersion
          )
      )
    },
    [workspaceVocabularies]
  )

  // Handles search input changes
  const handleSearchChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const term = removeDiacritics(event.target.value)
      console.log(flexSearch.info())
      console.log('TERM', term)
      const matchedVocabularies = term
        ? (await flexSearch.search(term)).map(
            (indexedVocabulary) => indexedVocabulary.vocabulary
          )
        : vocabularies
      console.log('MATCHED', matchedVocabularies)
      const finalVocabularies = filterWorkspaceVocabularies(matchedVocabularies)
      setFilteredVocabularies(finalVocabularies)
    },
    [
      flexSearch,
      vocabularies,
      filterWorkspaceVocabularies,
      setFilteredVocabularies,
    ]
  )

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
        onChange={handleSearchChange}
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
