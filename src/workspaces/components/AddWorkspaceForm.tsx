import React from 'react'
import { useSelector } from 'react-redux'
import { TextField } from '@material-ui/core'
import t from 'app/components/i18n'
import useActionForm from 'app/hooks/useActionForm'
import Actions from 'app/actions'
import { getIsAddWorkspaceFormOpen } from 'workspaces/selectors'
import useDispatchAction from 'app/hooks/useDispatchAction'
import FormDialog from 'app/components/FormDialog'

const AddWorkspaceForm: React.FC<{}> = () => {
  const isOpen = useSelector(getIsAddWorkspaceFormOpen)
  const closeForm = useDispatchAction(
    Actions.Workspaces.openAddWorkspaceForm(false)
  )
  const { register, errors, onSubmit } = useActionForm(
    Actions.Workspaces.addWorkspace.request
  )

  return (
    <FormDialog
      isOpen={isOpen}
      title={t`addWorkspace`}
      submitLabel={t`addWorkspace`}
      handleClose={closeForm}
      handleSubmit={onSubmit}
    >
      <form>
        <TextField
          autoComplete="off"
          margin="none"
          name="label"
          label={t`label`}
          inputRef={register({ required: t`app.errorRequired` })}
          error={!!errors.label}
          helperText={errors.label?.message}
        />
      </form>
    </FormDialog>
  )
}

export default AddWorkspaceForm
