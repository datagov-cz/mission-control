import React, { useCallback } from 'react'
import { of } from 'rxjs'
import { switchMap, tap, finalize } from 'rxjs/operators'

import { EditWorkspacePayload, Workspace } from '@types'

import t from 'components/i18n'
import FormDialog from 'components/form/FormDialog'
import TextField from 'components/form/TextField'
import Hidden from 'components/form/Hidden'
import { editWorkspace, fetchWorkspace } from 'data/workspaces'
import { suspend, unSuspend } from 'data/suspend'

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
      of(null)
        .pipe(
          tap(suspend),
          switchMap(() => editWorkspace(data)),
          switchMap(() => fetchWorkspace(workspace.id)),
          finalize(unSuspend),
          finalize(onClose)
        )
        .subscribe()
    },
    [workspace.id, onClose]
  )

  return (
    <FormDialog
      isOpen={isOpen}
      onClose={onClose}
      title={t`editWorkspace`}
      submitLabel={t`editWorkspace`}
      submitPendingLabel={t`editingWorkspace`}
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
