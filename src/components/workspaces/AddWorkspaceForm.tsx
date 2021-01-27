import React, { useCallback } from 'react'
import { useRouter } from 'react-router5'

import { AddWorkspacePayload } from '@types'
import Routes from 'app/routes'

import t from 'components/i18n'
import FormDialog from 'components/form/FormDialog'
import TextField from 'components/form/TextField'

import { addWorkspace } from 'data/workspaces'

type AddWorkspaceFormProps = {
  isOpen: boolean
  handleClose: () => void
}

const AddWorkspaceForm: React.FC<AddWorkspaceFormProps> = ({
  isOpen,
  handleClose,
}) => {
  const router = useRouter()
  const onSubmit = useCallback(
    (data: AddWorkspacePayload) => {
      addWorkspace(data).subscribe((id) =>
        router.navigate(Routes.Workspace, { id })
      )
    },
    [router]
  )

  return (
    <FormDialog
      isOpen={isOpen}
      title={t`addWorkspace`}
      submitLabel={t`addWorkspace`}
      onClose={handleClose}
      onSubmit={onSubmit}
    >
      <TextField
        name="label"
        label={t`label`}
        rules={{ required: 'common.errorRequired' }}
      />
    </FormDialog>
  )
}

export default AddWorkspaceForm
