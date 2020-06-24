import React, { forwardRef } from 'react'
import { range } from 'lodash'
import MaterialTable, {
  MaterialTableProps,
  Icons,
  Options,
  Column,
} from 'material-table'
import { Skeleton } from '@material-ui/lab'

import AddBox from '@material-ui/icons/AddBox'
import ArrowDownward from '@material-ui/icons/ArrowDownward'
import Check from '@material-ui/icons/Check'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Clear from '@material-ui/icons/Clear'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import Edit from '@material-ui/icons/Edit'
import FilterList from '@material-ui/icons/FilterList'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Remove from '@material-ui/icons/Remove'
import SaveAlt from '@material-ui/icons/SaveAlt'
import Search from '@material-ui/icons/Search'
import ViewColumn from '@material-ui/icons/ViewColumn'

const tableIcons: Icons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
}

const simpleTableOptions: Options = {
  toolbar: false,
  pageSize: 5,
  emptyRowsWhenPaging: false,
  paging: false,
}

const complexTableOptions: Options = {
  toolbar: false,
  pageSize: 10,
  emptyRowsWhenPaging: true,
  paging: true,
}

export type DataColumn<RowData extends object> = Column<RowData>

type DataTableProps<RowData extends object> = MaterialTableProps<RowData> & {
  type?: 'simple' | 'complex'
}

const DataTable = <RowData extends object>({
  isLoading = false,
  columns,
  data,
  options = {},
  type = 'complex',
  ...rest
}: DataTableProps<RowData>) => {
  const tableColumns = !isLoading
    ? columns
    : columns.map((column) => ({
        ...column,
        render: () => <Skeleton />,
      }))

  const tableOptions =
    type === 'complex'
      ? { ...complexTableOptions, ...options }
      : { ...simpleTableOptions, ...options }

  const tableData = !isLoading
    ? data
    : (range(tableOptions.pageSize!).map(() => ({})) as RowData[])

  return (
    <MaterialTable
      icons={tableIcons}
      options={tableOptions}
      columns={tableColumns}
      data={tableData}
      {...rest}
    />
  )
}

export default DataTable
