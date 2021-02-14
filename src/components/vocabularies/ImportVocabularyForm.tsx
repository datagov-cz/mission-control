import React, {
  useState,
  useCallback,
  useMemo,
  unstable_useTransition as useTransition,
} from 'react'
import { useObservableSuspense } from 'observable-hooks'
import { useRouter } from 'react-router5'
import FlexSearch from 'flexsearch'
import {
  TextField,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  InputAdornment,
  ListItemSecondaryAction,
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import SearchIcon from '@material-ui/icons/Search'
import WarningIcon from '@material-ui/icons/WarningOutlined'

import { BaseVocabularyWithWorkspace, Workspace } from '@types'
import Routes from 'app/routes'

import t from 'components/i18n'
import {
  addVocabulary,
  fetchWorkspaceVocabularies,
  workspaceVocabulariesResource,
} from 'data/vocabularies'
import {
  workspaceResource,
  vocabulariesWithWorkspacesResource,
  fetchWorkspace,
} from 'data/workspaces'
import removeDiacritics from 'utils/removeDiacritics'

type IndexedVocabulary = {
  id: number
  normalizedLabel: string
  normalizedIri: string
  vocabulary: BaseVocabularyWithWorkspace
}

type ImportVocabularyFormProps = {
  setTabIndex: (index: number) => void
  onClose: () => void
}

const ImportVocabularyForm: React.FC<ImportVocabularyFormProps> = ({
  setTabIndex,
  onClose,
}) => {
  const vocabularies = useObservableSuspense(vocabulariesWithWorkspacesResource)
  const workspaceVocabularies = useObservableSuspense(
    workspaceVocabulariesResource
  )
  const workspace = useObservableSuspense(workspaceResource)

  const [filteredVocabularies, setFilteredVocabularies] = useState<
    BaseVocabularyWithWorkspace[]
  >(vocabularies)

  const [
    selectedVocabulary,
    setSelectedVocabulary,
  ] = useState<BaseVocabularyWithWorkspace>()

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
        normalizedIri: removeDiacritics(vocabulary.vocabulary),
        vocabulary,
      })
    })
    return index
  }, [vocabularies])

  // Filters out vocabularies that are already present in the workspace
  const filterWorkspaceVocabularies = useCallback(
    (someVocabularies: BaseVocabularyWithWorkspace[]) => {
      const workspaceVocabulariesUris = workspaceVocabularies.map(
        (vocabulary) => vocabulary.vocabulary
      )
      return someVocabularies.filter(
        (vocabulary) =>
          !workspaceVocabulariesUris.includes(vocabulary.vocabulary)
      )
    },
    [workspaceVocabularies]
  )

  // Handles search input changes
  const handleSearchChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const term = removeDiacritics(event.target.value)
      const matchedVocabularies = term
        ? (await flexSearch.search(term)).map(
            (indexedVocabulary) => indexedVocabulary.vocabulary
          )
        : vocabularies
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
    (vocabulary: BaseVocabularyWithWorkspace) => {
      setSelectedVocabulary(vocabulary)
    },
    []
  )

  // Handles final import action, triggers backend request
  const handleImportClick = useCallback(
    (readOnly: boolean) => {
      addVocabulary({
        workspaceId: workspace!.id,
        vocabularyIri: selectedVocabulary!.vocabulary,
        readOnly,
      }).subscribe(() => {
        fetchWorkspaceVocabularies(workspace!.id)
        onClose()
      })
    },
    [workspace, selectedVocabulary, onClose]
  )

  const router = useRouter()
  const [startTransition, isPending] = useTransition()

  // Handles going to another workspace
  const handleGoToWorkspaceClick = useCallback(
    (workspace: Workspace) => {
      startTransition(() => {
        onClose()
        router.navigate(Routes.Workspace, { id: workspace.id })
        fetchWorkspace(workspace.id)
      })
    },
    [router, startTransition, onClose]
  )

  // Handles switching to the second tab
  const handleTabSwitch = useCallback(() => setTabIndex(1), [setTabIndex])

  const renderSearchField = useMemo(
    () => () => (
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
    ),
    [handleSearchChange]
  )

  const renderVocabulary = useMemo(
    () => (vocabulary: BaseVocabularyWithWorkspace) => (
      <>
        <ListItemText
          primary={vocabulary.label}
          secondary={vocabulary.vocabulary}
        />
        {vocabulary.workspace && (
          <ListItemSecondaryAction>
            <WarningIcon />
          </ListItemSecondaryAction>
        )}
      </>
    ),
    []
  )

  // Case 1 - user selected a vocabulary, but it's already being used in another workspace
  if (selectedVocabulary && selectedVocabulary.workspace) {
    return (
      <>
        {renderSearchField()}
        <ListItem>{renderVocabulary(selectedVocabulary)}</ListItem>
        <Box py={2}>
          <Alert severity="info">
            {t('vocabularyEditedInAnotherWorkspace', {
              workspace: selectedVocabulary.workspace.label,
            })}
          </Alert>
        </Box>
        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={() =>
            handleGoToWorkspaceClick(selectedVocabulary.workspace!)
          }
          disabled={isPending}
        >
          {t`goToWorkspace`}
        </Button>
        <Box py={0.5} />
        <Button
          fullWidth
          size="large"
          onClick={() => setSelectedVocabulary(undefined)}
          disabled={isPending}
        >
          {t`cancel`}
        </Button>
      </>
    )
  }

  // Case 2 - user selected a vocabulary that is ready to be imported
  if (selectedVocabulary) {
    console.log(selectedVocabulary)
    return (
      <>
        {renderSearchField()}
        <ListItem>{renderVocabulary(selectedVocabulary)}</ListItem>
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
    )
  }

  // Case 3 - display list of vocabularies matching search criteria
  if (filteredVocabularies.length > 0) {
    return (
      <>
        {renderSearchField()}
        <Box style={{ height: 380, overflowY: 'scroll' }}>
          <List>
            {filteredVocabularies.map((vocabulary) => (
              <ListItem
                button
                key={vocabulary.vocabulary}
                onClick={() => handleVocabularyClick(vocabulary)}
              >
                {renderVocabulary(vocabulary)}
              </ListItem>
            ))}
          </List>
        </Box>
      </>
    )
  }

  // Case 4 - no match of the search expression
  return (
    <>
      {renderSearchField()}
      <Button
        variant="contained"
        onClick={handleTabSwitch}
        fullWidth
      >{t`vocabularyNotFoundCreateNew`}</Button>
    </>
  )
}

export default ImportVocabularyForm
