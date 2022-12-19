import React, { useCallback, useEffect, useState } from "react";
import { Box, Dialog } from "@mui/material";
import vocabularyTypes from "../../app/vocabularyTypes.json";
import { useForm } from "react-hook-form";
import Form from "../form/Form";
import Checkbox from "../form/Checkbox";
import FormTextField from "../form/TextField";
import t from "../i18n";
import { AddVocabularyPayload, Project } from "../../@types";
import { useVocabularies } from "../../api/VocabularyApi";
import SubmitButton from "../form/SubmitButton";
import Hidden from "../form/Hidden";

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

  const [vocabularyTypeLabel, setVocabularyType] = useState(
    vocabularyTypes[0].label
  );

  const vocabularyType = vocabularyTypes.find(
    (v) => v.label === vocabularyTypeLabel
  )!;

  const onSubmit = useCallback(
    (payload: AddVocabularyPayload) => {
      console.log(payload);
    },[]
  );

  //TODO: Move this effect
  useEffect(() => {
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
          <Hidden name="vocabularyIri" value={""}/>
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
