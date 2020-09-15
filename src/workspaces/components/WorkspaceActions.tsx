import React from 'react'
import { useSelector } from 'react-redux'
import {
  Typography,
  Box,
  Button,
  Menu,
  MenuItem,
  Divider,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import t from 'app/components/i18n'
import useDispatchAction from 'app/hooks/useDispatchAction'
import Actions from 'app/actions'
import EditWorkspaceForm from './EditWorkspaceForm'
import DeleteWorkspaceForm from './DeleteWorkspaceForm'
import { getWorkspace } from 'workspaces/selectors'
import PublishWorkspaceDialog from './PublishWorkspaceDialog'
import Tools from './Tools'

const WorkspaceActions: React.FC = () => {
  const workspace = useSelector(getWorkspace)
  const publishRequest = useDispatchAction(
    Actions.Workspaces.publishWorkspace.request(workspace!)
  )
  const openPublishDialog = useDispatchAction(
    Actions.Workspaces.openPublishWorkspaceDialog(true)
  )

  const openEditForm = useDispatchAction(
    Actions.Workspaces.openEditWorkspaceForm(true)
  )

  const openDeleteForm = useDispatchAction(
    Actions.Workspaces.openDeleteWorkspaceForm(true)
  )

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const publish = () => {
    publishRequest()
    openPublishDialog()
    handleClose()
  }

  const edit = () => {
    openEditForm()
    handleClose()
  }

  const del = () => {
    openDeleteForm()
    handleClose()
  }

  return (
    <>
      <Box my={2} display="flex" flexDirection="row">
        <Tools workspaceUri={workspace?.uri} />
        <Button
          onClick={handleClick}
          endIcon={<ExpandMoreIcon />}
          variant="contained"
          color="default"
        >
          {t`advanced`}
        </Button>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={publish}>{t`publish`}</MenuItem>
          <MenuItem onClick={edit}>{t`editWorkspace`}</MenuItem>
          <Divider />
          <MenuItem onClick={del}>{t`deleteWorkspace`}</MenuItem>
        </Menu>
      </Box>
      <PublishWorkspaceDialog />
      <EditWorkspaceForm />
      <DeleteWorkspaceForm />
    </>
  )
}

export default WorkspaceActions
