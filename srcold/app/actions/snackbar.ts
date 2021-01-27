import { createAction, ActionType } from 'typesafe-actions'

import { SnackbarMessage, SnackbarContent } from 'app/types'

const SnackbarActions = {
  error: createAction('app/snackbar/error')<SnackbarMessage>(),
  warning: createAction('app/snackbar/warning')<SnackbarMessage>(),
  info: createAction('app/snackbar/info')<SnackbarMessage>(),
  success: createAction('app/snackbar/success')<SnackbarMessage>(),
  message: createAction('app/snackbar/message')<SnackbarContent>(),
}

export type SnackbarAction = ActionType<typeof SnackbarActions>

export default SnackbarActions
