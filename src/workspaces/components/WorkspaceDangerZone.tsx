import React from 'react'
import { Typography, Box, Button } from '@material-ui/core'

import t from 'app/components/i18n'
import useDispatchAction from 'app/hooks/useDispatchAction'
import Actions from 'app/actions'
import EditWorkspaceForm from './EditWorkspaceForm'
import DeleteWorkspaceForm from './DeleteWorkspaceForm'

const WorkspaceDangerZone: React.FC = () => {
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
      <EditWorkspaceForm />
      <DeleteWorkspaceForm />
    </>
  )
}

export default WorkspaceDangerZone
