import React, { useCallback, useEffect, useState } from "react";
import { Box, Dialog } from "@mui/material";
import vocabularyTypes from "../../app/vocabularyTypes.json";
import { useForm } from "react-hook-form";
import Form from "../form/Form";
import Checkbox from "../form/Checkbox";
import FormTextField from "../form/TextField";
import t from "../i18n";
import { AddVocabularyPayload } from "../../@types";
import { useVocabularies } from "../../api/VocabularyApi";
import SubmitButton from "../form/SubmitButton";

interface CreateVocabularyFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateVocabularyForm: React.FC<CreateVocabularyFormProps> = ({
  isOpen,
  onClose,
}) => {
  const form = useForm();
  const { data = [], isLoading } = useVocabularies();

  const label = form.watch("label") as string;
  const legislative = form.watch("legislative") as boolean;

  const [vocabularyTypeLabel, setVocabularyType] = useState(
    vocabularyTypes[0].label
  );

  const vocabularyType = vocabularyTypes.find(
    (v) => v.label === vocabularyTypeLabel
  )!;

  const onSubmit = useCallback(
    (payload: AddVocabularyPayload) => {
      console.log(payload);
      console.log(legislative);
    },
    [legislative]
  );

  const handleLegislativeToggle = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    form.setValue("legislative", event.target.checked);
    setVocabularyType(vocabularyTypes[event.target.checked ? 1 : 0].label);
  };

  //TODO: Move this effect
  useEffect(() => {
    // Prefills the default vocabulary IRI
    const chunks = label
      ? label.toLowerCase().match(new RegExp(vocabularyType.autoIriRegex, "g"))
      : null;
    const iriSafeLabel = chunks
      ? vocabularyType.autoIriMatchAll
        ? chunks.join("-")
        : chunks[0]
      : "";
    form.setValue("vocabularyIri", `${vocabularyType.prefix}${iriSafeLabel}`);
  }, [label, form, vocabularyType]);

  if (isLoading) return <></>;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box sx={{ height: 480, padding: 2 }}>
        <Form form={form}>
          <FormTextField
            fullWidth
            name="vocabularyIri"
            label={t`vocabularyIri`}
            disabled={true}
            defaultValue={vocabularyType?.prefix}
            rules={{
              pattern: {
                value: new RegExp(vocabularyType?.regex!),
                message: vocabularyType?.regex!,
              },
              validate: (value) => !data.find((v) => v.basedOnVersion === value) || "vocabularyIriExists"
            }}
          />
          <FormTextField
            color={"primary"}
            fullWidth
            required={true}
            name="label"
            label={t`vocabularyLabel`}
            rules={{
              required: "common.errorRequired",
            }}
          />
          <Checkbox
            sx={{ color: "blue" }}
            onChange={handleLegislativeToggle}
            name="legislative"
            defaultChecked={false}
            label={t`legislative`}
          />
          <SubmitButton
            onClick={onSubmit}
            pending={t`addingVocabulary`}
          >{t`addVocabulary`}</SubmitButton>
        </Form>
      </Box>
    </Dialog>
  );
};

export default CreateVocabularyForm;
