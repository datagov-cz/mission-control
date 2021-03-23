import React, { useCallback } from 'react'
import { switchMap, finalize } from 'rxjs/operators'
import { useRouter } from 'react-router5'
import { Typography } from '@material-ui/core'

import { DeleteWorkspacePayload, Workspace } from '@types'
import Routes from 'app/routes'

import t from 'components/i18n'
import FormDialog, { FormDialogProps } from 'components/form/FormDialog'
import TextField from 'components/form/TextField'
import Hidden from 'components/form/Hidden'
import { deleteWorkspace } from 'data/workspaces'
import { execute } from 'utils/epic'

type DeleteWorkspaceFormProps = Pick<FormDialogProps, 'isOpen' | 'onClose'> & {
  workspace: Workspace
}

const DeleteWorkspaceForm: React.FC<DeleteWorkspaceFormProps> = ({
  workspace,
  ...props
}) => {
  const router = useRouter()
  const onSubmit = useCallback(
    (data: DeleteWorkspacePayload) =>
      execute(
        switchMap(() => deleteWorkspace(data)),
        finalize(() => router.navigate(Routes.MyWorkspaces))
      ),
    [router]
  )

  return (
    <FormDialog
      {...props}
      title={t`deleteWorkspace`}
      submitLabel={t`deleteWorkspace`}
      submitPendingLabel={t`deletingWorkspace`}
      onSubmit={onSubmit}
    >
      <Hidden name="uri" value={workspace.uri} />
      <Typography paragraph>
        {t('fillInWorkspaceLabel', { label: workspace?.label })}
      </Typography>
      <TextField
        margin="none"
        name="label"
        label={t`label`}
        rules={{
          validate: {
            match: (value: string) =>
              value === workspace.label || 'workspaceLabelDoesNotMatch',
          },
        }}
        autoFocus
      />
    </FormDialog>
  )
}

export default DeleteWorkspaceForm
