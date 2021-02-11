import React, { useState, useCallback } from 'react'
import { finalize, switchMap } from 'rxjs/operators'
import { useForm } from 'react-hook-form'
import {
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Box,
} from '@material-ui/core'

import { AddVocabularyPayload, Workspace } from '@types'
import vocabularyTypes from 'app/vocabularyTypes.json'

import t from 'components/i18n'
import SubmitButton from 'components/form/SubmitButton'
import Form from 'components/form/Form'
import Hidden from 'components/form/Hidden'
import FormTextField from 'components/form/TextField'
import { addVocabulary, fetchWorkspaceVocabularies } from 'data/vocabularies'
import { execute } from 'utils/epic'

type CreateVocabularyFormProps = {
  workspace: Workspace
  onClose: () => void
}

const CreateVocabularyForm: React.FC<CreateVocabularyFormProps> = ({
  workspace,
  onClose,
}) => {
  const form = useForm()

  const onSubmit = useCallback(
    (payload: AddVocabularyPayload) => {
      execute(
        switchMap(() => addVocabulary(payload)),
        switchMap(() => fetchWorkspaceVocabularies(workspace.id)),
        finalize(onClose)
      )
    },
    [workspace, onClose]
  )

  const [vocabularyTypeLabel, setVocabularyType] = useState(
    vocabularyTypes[0].label
  )

  const vocabularyType = vocabularyTypes.find(
    (v) => v.label === vocabularyTypeLabel
  )

  // Handles vocabulary type change when user selects radio option, resets form
  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedTypeLabel = (event.target as HTMLInputElement).value
    const selectedType = vocabularyTypes.find(
      (v) => v.label === selectedTypeLabel
    )
    setVocabularyType(selectedTypeLabel)
    form.reset({
      vocabularyIri: selectedType?.prefix,
      label: form.getValues('label'),
    })
  }

  return (
    <>
      <Box py={1} />
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
      <Form form={form}>
        <Hidden name="workspaceId" value={workspace.id} />
        <Hidden name="readOnly" value="false" />
        <FormTextField
          name="vocabularyIri"
          label={t`vocabularyIri`}
          defaultValue={vocabularyType?.prefix}
          rules={{
            pattern: {
              value: new RegExp(vocabularyType?.regex!),
              message: vocabularyType?.regex!,
            },
          }}
        />
        <FormTextField
          name="label"
          label={t`vocabularyLabel`}
          rules={{
            required: 'common.errorRequired',
          }}
        />
        <SubmitButton
          onClick={onSubmit}
          pending={t`addingVocabulary`}
        >{t`addVocabulary`}</SubmitButton>
      </Form>
    </>
  )
}

export default CreateVocabularyForm
