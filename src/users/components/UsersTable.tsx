import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import IconButton from '@material-ui/core/IconButton'

import { Edit, Delete } from '@material-ui/icons'
import t from 'app/components/i18n'

interface Column {
  id: 'name' | 'username' | 'active'
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: boolean) => string
}

const columns: Column[] = [
  { id: 'name', label: 'Jméno', minWidth: 170 },
  { id: 'username', label: 'Uživatelské jméno', minWidth: 100 },
  {
    id: 'active',
    label: 'Aktivní',
    minWidth: 170,
    align: 'right',
    format: (value: boolean) => (value ? 'Ano' : 'Ne'),
  },
]

interface Data {
  name: string
  username: string
  active: boolean
}

function createData(name: string, username: string, active: boolean): Data {
  return { name, username, active }
}

const rows = [
  createData('Karel Klíma', 'karelklima', true),
  createData('Karel Klíma', 'karelklima', true),
  createData('Karel Klíma', 'karelklima', true),
  createData('Karel Klíma', 'karelklima', true),
  createData('Karel Klíma', 'karelklima', true),
  createData('Karel Klíma', 'karelklima', true),
  createData('Karel Klíma', 'karelklima', true),
  createData('Karel Klíma', 'karelklima', true),
  createData('Karel Klíma', 'karelklima', true),
  createData('Karel Klíma', 'karelklima', true),
  createData('Karel Klíma', 'karelklima', true),
  createData('Karel Klíma', 'karelklima', true),
]

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: '75vh',
  },
})

export default function UsersDummyTable() {
  const classes = useStyles()
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column: Column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell align="right">{t`actions`}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.username}
                  >
                    {columns.map((column) => {
                      const value = row[column.id]
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      )
                    })}
                    <TableCell key="actions" align="right">
                      <IconButton>
                        <Edit />
                      </IconButton>
                      <IconButton>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  )
}
