import React, { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useObservableSuspense } from 'observable-hooks'
import {
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Box,
} from '@material-ui/core'

import { AddVocabularyPayload } from '@types'
import vocabularyTypes from 'app/vocabularyTypes.json'

import t from 'components/i18n'
import SubmitButton from 'components/form/SubmitButton'
import Form from 'components/form/Form'
import Hidden from 'components/form/Hidden'
import FormTextField from 'components/form/TextField'
import { addVocabulary, fetchWorkspaceVocabularies } from 'data/vocabularies'
import { workspaceResource } from 'data/workspaces'

type CreateVocabularyFormProps = {
  onClose: () => void
}

const CreateVocabularyForm: React.FC<CreateVocabularyFormProps> = ({
  onClose,
}) => {
  const workspace = useObservableSuspense(workspaceResource)

  const form = useForm()

  const onSubmit = useCallback(
    (payload: AddVocabularyPayload) => {
      addVocabulary(payload).subscribe(() => {
        fetchWorkspaceVocabularies(workspace.id)
        onClose()
      })
    },
    [onClose, workspace]
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
      <Box my={1} />
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
        <SubmitButton onClick={onSubmit}>{t`addVocabulary`}</SubmitButton>
      </Form>
    </>
  )
}

export default CreateVocabularyForm
