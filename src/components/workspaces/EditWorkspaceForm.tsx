import React, { useCallback } from 'react'

import { EditWorkspacePayload, Workspace } from '@types'

import t from 'components/i18n'
import FormDialog from 'components/form/FormDialog'
import TextField from 'components/form/TextField'
import Hidden from 'components/form/Hidden'
import {
  editWorkspace,
  fetchWorkspace,
  invalidateWorkspace,
} from 'data/workspaces'

type EditWorkspaceFormProps = {
  isOpen: boolean
  onClose: () => void
  workspace: Workspace
}

const EditWorkspaceForm: React.FC<EditWorkspaceFormProps> = ({
  workspace,
  onClose,
  isOpen,
}) => {
  const onSubmit = useCallback(
    (data: EditWorkspacePayload) => {
      invalidateWorkspace()
      editWorkspace(data).subscribe(() => {
        fetchWorkspace(workspace.id)
        onClose()
      })
    },
    [workspace, onClose]
  )

  return (
    <FormDialog
      isOpen={isOpen}
      onClose={onClose}
      title={t`editWorkspace`}
      submitLabel={t`editWorkspace`}
      onSubmit={onSubmit}
    >
      <Hidden name="uri" value={workspace.uri} />

      <TextField
        margin="none"
        name="label"
        label={t`label`}
        rules={{ required: 'common.errorRequired' }}
        defaultValue={workspace.label}
      />
    </FormDialog>
  )
}

export default EditWorkspaceForm
