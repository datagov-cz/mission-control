import React, { useCallback, useMemo, useState } from "react";
import { switchMap } from "rxjs/operators";
import { Box } from "@mui/material";
import {
  GridCellParams,
  GridColDef,
  GridValueGetterParams,
  GridSortModel,
} from "@material-ui/data-grid";

import { Vocabulary, Workspace } from "@types";

import t from "components/i18n";
import {
  DataTableObservableResource,
  DataTableSuspense,
} from "components/DataTable";
import VocabularyActions from "./VocabularyActions";
import DeleteVocabularyForm from "./DeleteVocabularyForm";
import useToggle from "hooks/useToggle";
import {
  fetchWorkspaceVocabularies,
  updateVocabulary,
  workspaceVocabulariesResource,
} from "data/vocabularies";
import { workspaceResource } from "data/workspaces";
import { execute } from "utils/epic";

const TitleCell = (cellParams: GridCellParams) => {
  const rowData = cellParams.row as Vocabulary;
  return (
    <Box display="flex" flexDirection="column" lineHeight={1.5}>
      <b>{rowData.label}</b>
      <span>{rowData.changeTrackingVocabulary}</span>
    </Box>
  );
};

const getColumns = (
  onUpdate: (vocabulary: Vocabulary) => void,
  onDelete: (vocabulary: Vocabulary) => void
): GridColDef[] => [
  {
    renderHeader: () => t`label`,
    field: "label",
    renderCell: TitleCell,
    valueGetter: (cellParams: GridValueGetterParams) => cellParams.row.label,
    flex: 1,
  },
  {
    field: "actions",
    renderHeader: () => t`actions`,
    renderCell: (cellParams) => (
      <VocabularyActions
        vocabulary={cellParams.row as Vocabulary}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />
    ),
    width: 200,
    sortable: false,
  },
];

const defaultSortModel: GridSortModel = [
  {
    field: "label",
    sort: "asc",
  },
];

const VocabulariesTable: React.FC = () => {
  const { isOpen, open, close } = useToggle();
  const [deleteProps, setDeleteProps] = useState<{
    vocabulary: Vocabulary;
    workspace: Workspace;
  }>();

  const onUpdate = useCallback((vocabulary: Vocabulary) => {
    const workspace = workspaceResource.read();
    execute(
      switchMap(() => updateVocabulary({ workspace, vocabulary })),
      switchMap(() => fetchWorkspaceVocabularies(workspace.id))
    );
  }, []);

  const onDelete = useCallback(
    (vocabulary: Vocabulary) => {
      const workspace = workspaceResource.read();
      setDeleteProps({ vocabulary, workspace });
      open();
    },
    [setDeleteProps, open]
  );

  const columns = useMemo(
    () => getColumns(onUpdate, onDelete),
    [onUpdate, onDelete]
  );

  return (
    <>
      <DataTableSuspense
        resource={
          workspaceVocabulariesResource as unknown as DataTableObservableResource
        }
        columns={columns}
        defaultSortModel={defaultSortModel}
        hideFooter
        rowHeight={76}
      />
      <DeleteVocabularyForm isOpen={isOpen} onClose={close} {...deleteProps} />
    </>
  );
};

export default VocabulariesTable;
