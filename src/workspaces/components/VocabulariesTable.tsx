import React from 'react'

import t from 'app/components/i18n'
import { useSelector } from 'react-redux'
import { getVocabularies, getWorkspacesLoading } from 'workspaces/selectors'
import { Vocabulary } from 'workspaces/types'
import DataTable, { DataColumn } from 'app/components/DataTable'
import KeyValueTable from 'app/components/KeyValueTable'
import { Box, styled } from '@material-ui/core'

const columns: DataColumn<Vocabulary>[] = [
  {
    title: t`uri`,
    field: 'vocabulary',
  },
  {
    title: t`readOnly`,
    field: 'isReadOnly',
    render: (rowData) => t(String(rowData.isReadOnly)),
  },
]

const GreyBox = styled(Box)({
  background: '#EEE',
})

const DetailPanel = (rowData: Vocabulary) => {
  const data = [
    {
      key: t`vocabularyContext`,
      value: rowData.vocabularyContext,
    },
    {
      key: t`changeTrackingContext`,
      value: rowData.changeTrackingContext,
    },
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
    <DataTable
      isLoading={isLoading}
      columns={columns}
      data={vocabularies}
      detailPanel={DetailPanel}
      type="simple"
    />
  )
}

export default VocabulariesTable
