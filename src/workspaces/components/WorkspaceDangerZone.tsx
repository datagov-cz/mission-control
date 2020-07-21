import React from 'react'
import { useSelector } from 'react-redux'
import { Typography, Box, Button } from '@material-ui/core'

import t from 'app/components/i18n'
import useDispatchAction from 'app/hooks/useDispatchAction'
import Actions from 'app/actions'
import EditWorkspaceForm from './EditWorkspaceForm'
import DeleteWorkspaceForm from './DeleteWorkspaceForm'
import { getWorkspace } from 'workspaces/selectors'
import PublishWorkspaceDialog from './PublishWorkspaceDialog'

const WorkspaceDangerZone: React.FC = () => {
  const workspace = useSelector(getWorkspace)
  const publish = useDispatchAction(
    Actions.Workspaces.publishWorkspace.request(workspace!)
  )

  const openEditForm = useDispatchAction(
    Actions.Workspaces.openEditWorkspaceForm(true)
  )

  const openDeleteForm = useDispatchAction(
    Actions.Workspaces.openDeleteWorkspaceForm(true)
  )
  return (
    <>
      <Typography variant="h5" paragraph>
        {t`dangerZone`}
      </Typography>
      <Box my={2} display="flex" flexDirection="row">
        <Button onClick={publish} variant="contained" color="primary">
          {t`publish`}
        </Button>
        <Box m={1} />
        <Button
          onClick={openEditForm}
          color="primary"
          variant="contained"
          size="large"
        >
          {t`editWorkspace`}
        </Button>
        <Box m={1} />
        <Button
          onClick={openDeleteForm}
          color="secondary"
          variant="contained"
          size="large"
        >
          {t`deleteWorkspace`}
        </Button>
      </Box>
      <PublishWorkspaceDialog />
      <EditWorkspaceForm />
      <DeleteWorkspaceForm />
    </>
  )
}

export default WorkspaceDangerZone
