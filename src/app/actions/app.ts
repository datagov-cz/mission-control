import { createAction } from 'typesafe-actions'
import { SnackbarMessage, SnackbarContent } from 'app/types'

const AppActions = {
  init: createAction('app/init')(),
  initFinished: createAction('app/initFinished')(),
  error: createAction('app/snackbar/error')<SnackbarMessage>(),
  warning: createAction('app/snackbar/warning')<SnackbarMessage>(),
  info: createAction('app/snackbar/info')<SnackbarMessage>(),
  success: createAction('app/snackbar/success')<SnackbarMessage>(),
  message: createAction('app/snackbar/message')<SnackbarContent>(),
}

export default AppActions
