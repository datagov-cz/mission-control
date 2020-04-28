import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Snackbar as BaseSnackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

import { getSnackbar } from 'app/selectors'
import t from 'app/components/i18n'

const Snackbar: React.FC = () => {
  const { message, type, id } = useSelector(getSnackbar)
  const [open, setOpen] = useState(true)
  useEffect(() => {
    setOpen(true)
  }, [id])

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  return (
    <BaseSnackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={open && message.length > 0}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert elevation={6} variant="filled" severity={type}>
        {t(message)}
      </Alert>
    </BaseSnackbar>
  )
}

export default Snackbar
