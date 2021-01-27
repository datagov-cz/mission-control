import React from 'react'
import { useSelector } from 'react-redux'
import { TextField, Typography } from '@material-ui/core'
import t from 'app/components/i18n'
import useActionForm from 'app/hooks/useActionForm'
import Actions from 'app/actions'
import {
  getIsDeleteWorkspaceFormOpen,
  getWorkspace,
} from 'workspaces/selectors'
import useDispatchAction from 'app/hooks/useDispatchAction'
import FormDialog from 'app/components/FormDialog'

const DeleteWorkspaceForm: React.FC<{}> = () => {
  const isOpen = useSelector(getIsDeleteWorkspaceFormOpen)
  const workspace = useSelector(getWorkspace)
  const closeForm = useDispatchAction(
    Actions.Workspaces.openDeleteWorkspaceForm(false)
  )
  const { register, errors, onSubmit } = useActionForm(
    Actions.Workspaces.deleteWorkspace.request
  )

  return (
    <FormDialog
      isOpen={isOpen}
      title={t`deleteWorkspace`}
      submitLabel={t`deleteWorkspace`}
      handleClose={closeForm}
      handleSubmit={onSubmit}
    >
      <form>
        <input type="hidden" name="uri" value={workspace?.uri} ref={register} />
        <Typography paragraph>
          {t('fillInWorkspaceLabel', { label: workspace?.label })}
        </Typography>
        <TextField
          autoComplete="off"
          margin="none"
          name="label"
          label={t`label`}
          inputRef={register({
            validate: {
              match: (value) =>
                value === workspace?.label || t`workspaceLabelDoesNotMatch`,
            },
          })}
          error={!!errors.label}
          helperText={errors.label?.message}
        />
      </form>
    </FormDialog>
  )
}

export default DeleteWorkspaceForm
