import React, { useState, useCallback, useEffect } from "react";
import { finalize, switchMap } from "rxjs/operators";
import { useForm } from "react-hook-form";
import {
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Box,
} from "@mui/material";

import { AddVocabularyPayload, Workspace } from "@types";
import vocabularyTypes from "app/vocabularyTypes.json";

import t from "components/i18n";
import SubmitButton from "components/form/SubmitButton";
import Form from "components/form/Form";
import Hidden from "components/form/Hidden";
import FormTextField from "components/form/TextField";
import Checkbox from "components/form/Checkbox";
import {
  addVocabulary,
  fetchWorkspaceVocabularies,
  vocabulariesResource,
} from "data/vocabularies";
import { execute } from "utils/epic";
import { useObservableSuspense } from "observable-hooks";

type CreateVocabularyFormProps = {
  workspace: Workspace;
  onClose: () => void;
};

const CreateVocabularyForm: React.FC<CreateVocabularyFormProps> = ({
  workspace,
  onClose,
}) => {
  const existingVocabularies = useObservableSuspense(vocabulariesResource);

  const restrictedVocabularyIris = existingVocabularies.map(
    (v) => v.vocabulary
  );

  const form = useForm();

  const onSubmit = useCallback(
    (payload: AddVocabularyPayload) => {
      execute(
        switchMap(() => addVocabulary(payload)),
        switchMap(() => fetchWorkspaceVocabularies(workspace.id)),
        finalize(onClose)
      );
    },
    [workspace, onClose]
  );

  const [vocabularyTypeLabel, setVocabularyType] = useState(
    vocabularyTypes[0].label
  );

  const vocabularyType = vocabularyTypes.find(
    (v) => v.label === vocabularyTypeLabel
  )!;

  const useDefaultIri = form.watch("defaultIri", true) as boolean;
  const label = form.watch("label") as string;

  // Handles vocabulary type change when user selects radio option, resets form
  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedTypeLabel = (event.target as HTMLInputElement).value;
    const selectedType = vocabularyTypes.find(
      (v) => v.label === selectedTypeLabel
    )!;
    setVocabularyType(selectedTypeLabel);
    if (useDefaultIri) {
      form.setValue("vocabularyIri", selectedType.prefix);
    }
  };

  useEffect(() => {
    if (useDefaultIri) {
      // Prefills the default vocabulary IRI
      const chunks = label
        ? label
            .toLowerCase()
            .match(new RegExp(vocabularyType.autoIriRegex, "g"))
        : null;
      const iriSafeLabel = chunks
        ? vocabularyType.autoIriMatchAll
          ? chunks.join("-")
          : chunks[0]
        : "";
      form.setValue("vocabularyIri", `${vocabularyType.prefix}${iriSafeLabel}`);
    }
  }, [useDefaultIri, label, form, vocabularyType]);

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
          name="label"
          label={t`vocabularyLabel`}
          rules={{
            required: "common.errorRequired",
          }}
        />
        <Checkbox
          name="defaultIri"
          defaultChecked={true}
          label={t`useDefaultVocabularyIri`}
        />
        <FormTextField
          name="vocabularyIri"
          label={t`vocabularyIri`}
          disabled={useDefaultIri}
          defaultValue={vocabularyType?.prefix}
          rules={{
            pattern: {
              value: new RegExp(vocabularyType?.regex!),
              message: vocabularyType?.regex!,
            },
            validate: (value) =>
              !restrictedVocabularyIris.includes(value) ||
              "vocabularyIriExists",
          }}
        />
        <SubmitButton
          onClick={onSubmit}
          pending={t`addingVocabulary`}
        >{t`addVocabulary`}</SubmitButton>
      </Form>
    </>
  );
};

export default CreateVocabularyForm;
