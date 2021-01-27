import React, { useCallback } from 'react'
import { useRouter } from 'react-router5'
import { Typography } from '@material-ui/core'

import { DeleteWorkspacePayload, Workspace } from '@types'
import Routes from 'app/routes'

import t from 'components/i18n'
import FormDialog from 'components/form/FormDialog'
import TextField from 'components/form/TextField'
import Hidden from 'components/form/Hidden'
import { deleteWorkspace } from 'data/workspaces'

type DeleteWorkspaceFormProps = {
  isOpen: boolean
  onClose: () => void
  workspace: Workspace
}

const DeleteWorkspaceForm: React.FC<DeleteWorkspaceFormProps> = ({
  workspace,
  ...props
}) => {
  const router = useRouter()
  const onSubmit = useCallback(
    (data: DeleteWorkspacePayload) =>
      deleteWorkspace(data).subscribe(() => router.navigate(Routes.Workspaces)),
    [router]
  )

  return (
    <FormDialog
      {...props}
      title={t`deleteWorkspace`}
      submitLabel={t`deleteWorkspace`}
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
      />
    </FormDialog>
  )
}

export default DeleteWorkspaceForm
