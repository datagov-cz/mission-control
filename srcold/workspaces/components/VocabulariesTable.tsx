import React from 'react'
import { useSelector } from 'react-redux'
import { Tooltip } from '@material-ui/core'
import SecurityIcon from '@material-ui/icons/Security'
import EditIcon from '@material-ui/icons/Edit'

import t from 'app/components/i18n'
import DataTable, { DataColumn } from 'app/components/DataTable'
import {
  getWorkspaceVocabularies,
  getWorkspacesLoading,
} from 'workspaces/selectors'
import { Vocabulary } from 'workspaces/types'
import VocabularyActions from './VocabularyActions'
import DeleteVocabularyForm from './DeleteVocabularyForm'

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

const columns: DataColumn<Vocabulary>[] = [
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
    render: (vocabulary) => <VocabularyActions vocabulary={vocabulary} />,
  },
]

const VocabulariesTable: React.FC = () => {
  const vocabularies = useSelector(getWorkspaceVocabularies)
  const isLoading = useSelector(getWorkspacesLoading)

  return (
    <>
      <DataTable
        isLoading={isLoading}
        columns={columns}
        data={vocabularies}
        type="simple"
      />
      <DeleteVocabularyForm />
    </>
  )
}

export default VocabulariesTable
