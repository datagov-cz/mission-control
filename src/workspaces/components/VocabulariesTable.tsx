import React from 'react'
import { useSelector } from 'react-redux'
import { Box, styled } from '@material-ui/core'

import t from 'app/components/i18n'
import DataTable, { DataColumn } from 'app/components/DataTable'
import KeyValueTable from 'app/components/KeyValueTable'
import { getVocabularies, getWorkspacesLoading } from 'workspaces/selectors'
import { Vocabulary } from 'workspaces/types'
import VocabularyActions from './VocabularyActions'
import DeleteVocabularyForm from './DeleteVocabularyForm'

const columns: DataColumn<Vocabulary>[] = [
  {
    title: t`label`,
    field: 'label',
  },
  {
    title: t`readOnly`,
    field: 'isReadOnly',
    render: (rowData) => t(String(rowData.isReadOnly)),
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

const GreyBox = styled(Box)({
  background: '#EEE',
})

const DetailPanel = (rowData: Vocabulary) => {
  const data = [
    {
      key: t`changeTrackingVocabulary`,
      value: rowData.changeTrackingVocabulary,
    },
  ]
  return (
    <GreyBox pl={6.5}>
      <KeyValueTable data={data} transparent />
    </GreyBox>
  )
}

const VocabulariesTable: React.FC = () => {
  const vocabularies = useSelector(getVocabularies)
  const isLoading = useSelector(getWorkspacesLoading)

  return (
    <>
      <DataTable
        isLoading={isLoading}
        columns={columns}
        data={vocabularies}
        detailPanel={DetailPanel}
        type="simple"
      />
      <DeleteVocabularyForm />
    </>
  )
}

export default VocabulariesTable
