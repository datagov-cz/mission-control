import React from 'react'
import { useSelector } from 'react-redux'
import { TextField } from '@material-ui/core'
import t from 'app/components/i18n'
import useActionForm from 'app/hooks/useActionForm'
import Actions from 'app/actions'
import { getIsEditWorkspaceFormOpen, getWorkspace } from 'workspaces/selectors'
import useDispatchAction from 'app/hooks/useDispatchAction'
import FormDialog from 'app/components/FormDialog'

const EditWorkspaceForm: React.FC<{}> = () => {
  const isOpen = useSelector(getIsEditWorkspaceFormOpen)
  const workspace = useSelector(getWorkspace)
  const closeForm = useDispatchAction(
    Actions.Workspaces.openEditWorkspaceForm(false)
  )
  const { register, errors, onSubmit } = useActionForm(
    Actions.Workspaces.editWorkspace.request
  )

  return (
    <FormDialog
      isOpen={isOpen}
      title={t`editWorkspace`}
      submitLabel={t`editWorkspace`}
      handleClose={closeForm}
      handleSubmit={onSubmit}
    >
      <form>
        <input type="hidden" name="uri" value={workspace?.uri} ref={register} />
        <TextField
          autoComplete="off"
          margin="none"
          name="label"
          label={t`label`}
          defaultValue={workspace?.label}
          inputRef={register({ required: t`app.errorRequired` })}
          error={!!errors.label}
          helperText={errors.label?.message}
        />
      </form>
    </FormDialog>
  )
}

export default EditWorkspaceForm
