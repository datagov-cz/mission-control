import React, { useCallback, useMemo, useState } from 'react'
import { Tooltip } from '@material-ui/core'
import SecurityIcon from '@material-ui/icons/Security'
import EditIcon from '@material-ui/icons/Edit'

import { Vocabulary, Workspace } from '@types'

import t from 'components/i18n'
import { DataColumn, DataTableSuspense } from 'components/DataTable'
import VocabularyActions from './VocabularyActions'
import DeleteVocabularyForm from './DeleteVocabularyForm'
import useToggle from 'hooks/useToggle'
import {
  fetchWorkspaceVocabularies,
  updateVocabulary,
  workspaceVocabulariesResource,
} from 'data/vocabularies'
import { workspaceResource } from 'data/workspaces'

const TitleColumn = (rowData: Vocabulary) => (
  <>
    <b>{rowData.label}</b>
    <br />
    {rowData.changeTrackingVocabulary}
  </>
)

const ReadOnlyColumn = (rowData: Vocabulary) =>
  rowData.isReadOnly ? (
    <Tooltip title={t('readOnly')}>
      <SecurityIcon />
    </Tooltip>
  ) : (
    <Tooltip title={t('readAndWrite')}>
      <EditIcon />
    </Tooltip>
  )

const getColumns = (
  onUpdate: (vocabulary: Vocabulary) => void,
  onDelete: (vocabulary: Vocabulary) => void
): DataColumn<Vocabulary>[] => [
  {
    title: '',
    render: ReadOnlyColumn,
    width: 40,
  },
  {
    title: t`label`,
    field: 'label',
    render: TitleColumn,
  },
  {
    title: t`actions`,
    headerStyle: {
      textAlign: 'right',
    },
    cellStyle: {
      textAlign: 'right',
    },
    sorting: false,
    render: (vocabulary) => (
      <VocabularyActions
        vocabulary={vocabulary}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />
    ),
  },
]

const VocabulariesTable: React.FC = () => {
  const { isOpen, open, close } = useToggle()
  const [deleteProps, setDeleteProps] = useState<{
    vocabulary: Vocabulary
    workspace: Workspace
  }>()

  const onUpdate = useCallback((vocabulary: Vocabulary) => {
    const workspace = workspaceResource.read()
    updateVocabulary({ workspace, vocabulary }).subscribe(() =>
      fetchWorkspaceVocabularies(workspace.id)
    )
  }, [])

  const onDelete = useCallback(
    (vocabulary: Vocabulary) => {
      const workspace = workspaceResource.read()
      setDeleteProps({ vocabulary, workspace })
      open()
    },
    [setDeleteProps, open]
  )

  const columns = useMemo(() => getColumns(onUpdate, onDelete), [
    onUpdate,
    onDelete,
  ])

  return (
    <>
      <DataTableSuspense
        resource={workspaceVocabulariesResource}
        columns={columns}
        type="simple"
      />
      <DeleteVocabularyForm isOpen={isOpen} onClose={close} {...deleteProps} />
    </>
  )
}

export default VocabulariesTable
