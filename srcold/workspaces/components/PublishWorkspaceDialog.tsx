import React from 'react'
import { useSelector } from 'react-redux'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Typography,
  Box,
  Button,
} from '@material-ui/core'

import Actions from 'app/actions'
import t from 'app/components/i18n'
import {
  getIsPublishWorkspaceDialogOpen,
  getPublishedWorkspacePRUri,
} from 'workspaces/selectors'
import useDispatchAction from 'app/hooks/useDispatchAction'

const PublishWorkspaceDialog: React.FC<{}> = () => {
  const open = useSelector(getIsPublishWorkspaceDialogOpen)
  const prUri = useSelector(getPublishedWorkspacePRUri)
  const handleClose = useDispatchAction(
    Actions.Workspaces.openPublishWorkspaceDialog(false)
  )
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{t`publishingWorkspace`}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {prUri ? (
            <>
              <Typography paragraph>{t`workspacePRCreated`}</Typography>
              <Typography paragraph>
                <a href={prUri} target="_blank" rel="noopener noreferrer">
                  {prUri}
                </a>
              </Typography>
              <Box my={1} />
              <Button
                onClick={handleClose}
                color="primary"
                fullWidth
                size="large"
              >
                {t`app.cancel`}
              </Button>
            </>
          ) : (
            t`publishingWorkspacePleaseWait`
          )}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  )
}

export default PublishWorkspaceDialog
