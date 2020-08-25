import React from 'react'
import { useSelector } from 'react-redux'
import { TextField, Checkbox, FormControlLabel } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'

import t from 'app/components/i18n'
import useActionForm from 'app/hooks/useActionForm'
import Actions from 'app/actions'
import {
  getVocabularies,
  getIsAddExistingVocabularyFormOpen,
  getWorkspace,
} from 'workspaces/selectors'
import useDispatchAction from 'app/hooks/useDispatchAction'
import FormDialog from 'app/components/FormDialog'

const AddExistingVocabularyForm: React.FC<{}> = () => {
  const isOpen = useSelector(getIsAddExistingVocabularyFormOpen)
  const vocabularies = useSelector(getVocabularies)
  const workspace = useSelector(getWorkspace)
  const closeForm = useDispatchAction(
    Actions.Workspaces.openAddExistingVocabularyForm(false)
  )
  const { register, errors, onSubmit } = useActionForm(
    Actions.Workspaces.addVocabulary.request
  )

  return (
    <FormDialog
      isOpen={isOpen}
      title={t`addExistingVocabulary`}
      submitLabel={t`addExistingVocabulary`}
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
        <Autocomplete
          options={vocabularies}
          autoHighlight
          getOptionLabel={(vocabulary) => vocabulary.uri}
          renderOption={(vocabulary) => (
            <React.Fragment>
              {vocabulary.label}
              <br />
              {vocabulary.uri}
            </React.Fragment>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              autoComplete="off"
              margin="none"
              name="vocabularyUri"
              label={t`vocabularyUri`}
              inputRef={register({ required: t`app.errorRequired` })}
              error={!!errors.vocabularyUri}
              helperText={errors.vocabularyUri?.message}
            />
          )}
        />
        <FormControlLabel
          control={
            <Checkbox
              color="secondary"
              name="readOnly"
              inputRef={register()}
              checked
              disabled
            />
          }
          label={t`readOnly`}
        />
      </form>
    </FormDialog>
  )
}

export default AddExistingVocabularyForm
