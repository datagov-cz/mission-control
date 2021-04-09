import React, { useState, useCallback, useMemo } from "react";
import { useObservableSuspense } from "observable-hooks";
import FlexSearch from "flexsearch";
import {
  TextField,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  InputAdornment,
  ListItemSecondaryAction,
  Dialog,
  DialogContent,
  DialogTitle,
  Tooltip,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import SearchIcon from "@material-ui/icons/Search";
import WarningIcon from "@material-ui/icons/WarningOutlined";

import { BaseVocabularyWithWorkspace } from "@types";

import t from "components/i18n";
import {
  addVocabulary,
  fetchWorkspaceVocabularies,
  workspaceVocabulariesResource,
} from "data/vocabularies";
import {
  workspaceResource,
  vocabulariesWithWorkspacesResource,
} from "data/workspaces";
import removeDiacritics from "utils/removeDiacritics";
import RouteLink from "components/RouteLink";
import { useIntl } from "react-intl";

type IndexedVocabulary = {
  id: number;
  normalizedLabel: string;
  normalizedIri: string;
  vocabulary: BaseVocabularyWithWorkspace;
};

type ImportVocabularyFormProps = {
  setTabIndex: (index: number) => void;
  onClose: () => void;
};

const ImportVocabularyForm: React.FC<ImportVocabularyFormProps> = ({
  setTabIndex,
  onClose,
}) => {
  const vocabularies = useObservableSuspense(
    vocabulariesWithWorkspacesResource
  );
  const workspaceVocabularies = useObservableSuspense(
    workspaceVocabulariesResource
  );
  const workspace = useObservableSuspense(workspaceResource);

  const [filteredVocabularies, setFilteredVocabularies] = useState<
    BaseVocabularyWithWorkspace[]
  >(vocabularies);

  const [
    selectedVocabulary,
    setSelectedVocabulary,
  ] = useState<BaseVocabularyWithWorkspace>();

  const intl = useIntl();

  // Create a search index with fulltext search support optimized for tolerant matching
  const flexSearch = useMemo(() => {
    const index = FlexSearch.create<IndexedVocabulary>({
      encode: "extra",
      tokenize: "full",
      threshold: 1,
      resolution: 3,
      doc: {
        id: "id",
        field: ["normalizedLabel", "normalizedIri"],
      },
    });
    vocabularies.forEach((vocabulary, id) => {
      index.add({
        id,
        normalizedLabel: removeDiacritics(vocabulary.label),
        normalizedIri: removeDiacritics(vocabulary.vocabulary),
        vocabulary,
      });
    });
    return index;
  }, [vocabularies]);

  // Filters out vocabularies that are already present in the workspace
  const filterWorkspaceVocabularies = useCallback(
    (someVocabularies: BaseVocabularyWithWorkspace[]) => {
      const workspaceVocabulariesUris = workspaceVocabularies.map(
        (vocabulary) => vocabulary.vocabulary
      );
      return someVocabularies.filter(
        (vocabulary) =>
          !workspaceVocabulariesUris.includes(vocabulary.vocabulary)
      );
    },
    [workspaceVocabularies]
  );

  // Handles search input changes
  const handleSearchChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const term = removeDiacritics(event.target.value);
      const matchedVocabularies = term
        ? (await flexSearch.search(term)).map(
            (indexedVocabulary) => indexedVocabulary.vocabulary
          )
        : vocabularies;
      const finalVocabularies = filterWorkspaceVocabularies(
        matchedVocabularies
      );
      setFilteredVocabularies(finalVocabularies);
    },
    [
      flexSearch,
      vocabularies,
      filterWorkspaceVocabularies,
      setFilteredVocabularies,
    ]
  );

  // Handles selecting a vocabulary from the list
  const handleVocabularyClick = useCallback(
    (vocabulary: BaseVocabularyWithWorkspace) => {
      if (vocabulary.workspace) {
        setSelectedVocabulary(vocabulary);
      } else {
        addVocabulary({
          workspaceId: workspace!.id,
          vocabularyIri: vocabulary.vocabulary,
        }).subscribe(() => {
          fetchWorkspaceVocabularies(workspace!.id);
          onClose();
        });
      }
    },
    [workspace, onClose]
  );

  // Handles switching to the second tab
  const handleTabSwitch = useCallback(() => setTabIndex(1), [setTabIndex]);

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
  );

  const renderVocabulary = useMemo(
    () => (vocabulary: BaseVocabularyWithWorkspace) => (
      <>
        <ListItemText
          primary={vocabulary.label}
          secondary={vocabulary.vocabulary}
        />
        {vocabulary.workspace && (
          <ListItemSecondaryAction>
            <Tooltip
              title={`${intl.formatMessage({
                id: "vocabularies.vocabularyEditedInAnotherWorkspace",
              })} ${vocabulary.workspace.label}`}
            >
              <WarningIcon />
            </Tooltip>
          </ListItemSecondaryAction>
        )}
      </>
    ),
    [intl]
  );

  // Case 1 - user selected a vocabulary, but it's already being used in another workspace
  if (selectedVocabulary && selectedVocabulary.workspace) {
    return (
      <Dialog open={true}>
        <DialogTitle>{t`cannotAddVocabulary`}</DialogTitle>
        <DialogContent>
          <ListItem>{renderVocabulary(selectedVocabulary)}</ListItem>
          <Box py={2}>
            <Alert severity="info">
              {t`vocabularyEditedInAnotherWorkspace`}{" "}
              <RouteLink
                route="workspace"
                params={{ id: selectedVocabulary.workspace.id }}
                onClick={onClose}
              >
                {selectedVocabulary.workspace.label}
              </RouteLink>
            </Alert>
          </Box>
          <Button
            fullWidth
            size="large"
            onClick={() => setSelectedVocabulary(undefined)}
          >
            {t`cancel`}
          </Button>
          <Box py={0.5} />
        </DialogContent>
      </Dialog>
    );
  }

  // Case 2 - display list of vocabularies matching search criteria
  if (filteredVocabularies.length > 0) {
    return (
      <>
        {renderSearchField()}
        <Box style={{ height: 380, overflowY: "scroll" }}>
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
    );
  }

  // Case 3 - no match of the search expression
  return (
    <>
      {renderSearchField()}
      <Button
        variant="contained"
        onClick={handleTabSwitch}
        fullWidth
      >{t`vocabularyNotFoundCreateNew`}</Button>
    </>
  );
};

export default ImportVocabularyForm;
