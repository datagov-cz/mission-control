import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  TextField,
  Checkbox,
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Box,
} from '@material-ui/core'
import t from 'app/components/i18n'
import useActionForm from 'app/hooks/useActionForm'
import Actions from 'app/actions'
import { getIsAddVocabularyFormOpen, getWorkspace } from 'workspaces/selectors'
import useDispatchAction from 'app/hooks/useDispatchAction'
import FormDialog from 'app/components/FormDialog'

const vocabularyTypes = [
  {
    label: 'Datový',
    prefix: 'https://slovník.gov.cz/datový/',
    regex: '^https://slovník.gov.cz/datový/[ěščřžýáíéóúůďťňa-z0-9]+$',
  },
  {
    label: 'Agendový',
    prefix: 'https://slovník.gov.cz/agendový/',
    regex: '^https://slovník.gov.cz/agendový/[a-z0-9]+$',
  },
  {
    label: 'Legislativní',
    prefix: 'https://slovník.gov.cz/legislativní/sbírka/',
    regex: '^https://slovník.gov.cz/legislativní/sbírka/[0-9]+/[0-9]+$',
  },
  {
    label: 'Generický',
    prefix: 'https://slovník.gov.cz/generický/',
    regex: '^https://slovník.gov.cz/generický/[a-z0-9]+$',
  },
]

const AddWorkspaceForm: React.FC<{}> = () => {
  const isOpen = useSelector(getIsAddVocabularyFormOpen)
  const workspace = useSelector(getWorkspace)
  const closeForm = useDispatchAction(
    Actions.Workspaces.openAddVocabularyForm(false)
  )
  const { register, errors, onSubmit, reset } = useActionForm(
    Actions.Workspaces.addVocabulary.request
  )

  const [vocabularyTypeLabel, setVocabularyType] = useState(
    vocabularyTypes[0].label
  )

  const vocabularyType = vocabularyTypes.find(
    (v) => v.label === vocabularyTypeLabel
  )

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedTypeLabel = (event.target as HTMLInputElement).value
    const selectedType = vocabularyTypes.find(
      (v) => v.label === selectedTypeLabel
    )
    setVocabularyType(selectedTypeLabel)
    reset({ vocabularyUri: selectedType?.prefix })
  }

  return (
    <FormDialog
      isOpen={isOpen}
      title={t`addVocabulary`}
      submitLabel={t`addVocabulary`}
      handleClose={closeForm}
      handleSubmit={onSubmit}
    >
      <FormControl component="fieldset">
        <FormLabel component="legend">{t`vocabularyType`}</FormLabel>
        <RadioGroup
          name="vocabularyType"
          value={vocabularyTypeLabel}
          onChange={handleTypeChange}
        >
          {vocabularyTypes.map((vocType) => (
            <FormControlLabel
              key={vocType.label}
              value={vocType.label}
              control={<Radio />}
              label={vocType.label}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Box m={1} />
      <form>
        <input
          type="hidden"
          name="workspaceUri"
          value={workspace?.uri}
          ref={register}
        />
        <TextField
          autoComplete="off"
          name="vocabularyUri"
          label={t`vocabularyUri`}
          defaultValue={vocabularyType?.prefix}
          inputRef={register({
            pattern: {
              value: new RegExp(vocabularyType?.regex!),
              message: vocabularyType?.regex!,
              // message: t`app.errorRequired`,
            },
          })}
          error={!!errors.vocabularyUri}
          helperText={errors.vocabularyUri?.message}
        />
        <TextField name="vocabularyLabel" label={t`vocabularyLabel`} />
        <FormControlLabel
          control={
            <Checkbox
              color="secondary"
              name="readOnly"
              inputRef={register()}
              disabled
            />
          }
          label={t`readOnly`}
        />
      </form>
    </FormDialog>
  )
}

export default AddWorkspaceForm
