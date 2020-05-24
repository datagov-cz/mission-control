import React from 'react'
import { useSelector } from 'react-redux'
import { TextField, Checkbox, FormControlLabel } from '@material-ui/core'
import t from 'app/components/i18n'
import useActionForm from 'app/hooks/useActionForm'
import Actions from 'app/actions'
import { getIsAddVocabularyFormOpen, getWorkspace } from 'workspaces/selectors'
import useDispatchAction from 'app/hooks/useDispatchAction'
import FormDialog from 'app/components/FormDialog'

const AddWorkspaceForm: React.FC<{}> = () => {
  const isOpen = useSelector(getIsAddVocabularyFormOpen)
  const workspace = useSelector(getWorkspace)
  const closeForm = useDispatchAction(
    Actions.Workspaces.openAddVocabularyForm(false)
  )
  const { register, errors, onSubmit } = useActionForm(
    Actions.Workspaces.addVocabulary.request
  )

  return (
    <FormDialog
      isOpen={isOpen}
      title={t`addVocabulary`}
      submitLabel={t`addVocabulary`}
      handleClose={closeForm}
      handleSubmit={onSubmit}
    >
      <form>
        <input
          type="hidden"
          name="workspaceUri"
          value={workspace?.uri}
          ref={register}
        />
        <TextField
          autoComplete="off"
          margin="none"
          name="vocabularyUri"
          label={t`vocabularyUri`}
          inputRef={register({ required: t`app.errorRequired` })}
          error={!!errors.vocabularyUri}
          helperText={errors.vocabularyUri?.message}
        />
        <FormControlLabel
          control={
            <Checkbox color="secondary" name="readOnly" inputRef={register()} />
          }
          label={t`readOnly`}
        />
      </form>
    </FormDialog>
  )
}

export default AddWorkspaceForm
