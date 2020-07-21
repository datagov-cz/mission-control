import React from 'react'
import { useSelector } from 'react-redux'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from '@material-ui/core'

import { getIsPublishWorkspaceDialogOpen } from 'workspaces/selectors'
import t from 'app/components/i18n'

const PublishWorkspaceDialog: React.FC<{}> = () => {
  const open = useSelector(getIsPublishWorkspaceDialogOpen)
  return (
    <Dialog open={open}>
      <DialogTitle>{t`publishingWorkspace`}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t`publishingWorkspacePleaseWait`}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  )
}

export default PublishWorkspaceDialog
