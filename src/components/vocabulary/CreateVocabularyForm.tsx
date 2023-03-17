import React, { useEffect, useState } from "react";
import { Box, Dialog, DialogTitle, IconButton } from "@mui/material";
import vocabularyTypes from "../../app/vocabularyTypes.json";
import { useForm } from "react-hook-form";
import Form from "../form/Form";
import Checkbox from "../form/Checkbox";
import FormTextField from "../form/TextField";
import t from "../i18n";
import { useVocabularies } from "../../api/VocabularyApi";
import SubmitButton from "../form/SubmitButton";
import { Namespace } from "../i18n";
import CloseIcon from "@mui/icons-material/Close";
import { AddVocabularyPayload } from "../../@types";

interface CreateVocabularyFormProps {
  isOpen: boolean;
  onClose: () => void;
  submitAction: (payload: AddVocabularyPayload) => void;
}

const CreateVocabularyForm: React.FC<CreateVocabularyFormProps> = ({
  isOpen,
  onClose,
  submitAction,
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

  const handleLegislativeToggle = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    form.setValue("legislative", event.target.checked);
    setVocabularyType(vocabularyTypes[event.target.checked ? 1 : 0].label);
  };

  const submit = (payload: AddVocabularyPayload) => {
    submitAction(payload);
    onClose();
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

  //Clean the form
  useEffect(() => {
    if (!isOpen) {
      form.setValue("label", "");
      form.setValue("legislative", false);
      setVocabularyType(vocabularyTypes[0].label);
    }
  }, [isOpen, form]);

  if (isLoading) return <></>;

  return (
    <Namespace.Provider value="vocabularies">
      <Dialog
        open={isOpen}
        onClose={onClose}
        maxWidth={"sm"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
          {t`createVocabulary`}
          {onClose ? (
            <IconButton
              aria-label="close"
              sx={{
                position: "absolute",
                right: 1,
                top: 1,
                color: "palette.grey[500]",
              }}
              onClick={onClose}
              size="large"
            >
              <CloseIcon />
            </IconButton>
          ) : null}
        </DialogTitle>
        <Box p={2}>
          <Form form={form}>
            <FormTextField
              fullWidth
              sx={{ marginBottom: 2 }}
              name="vocabularyIri"
              label={t`vocabularyIri`}
              defaultValue={vocabularyType?.prefix}
              rules={{
                pattern: {
                  value: new RegExp(vocabularyType?.regex!),
                  message: vocabularyType?.regex!,
                },
                validate: (value) =>
                  !data.find((v) => v.basedOnVersion === value) ||
                  "vocabularyIriExists",
              }}
            />
            <FormTextField
              color={"primary"}
              fullWidth
              sx={{ marginBottom: 2 }}
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
              sx={{ marginTop: 2 }}
              onClick={submit}
              pending={t`addingVocabulary`}
            >{t`addVocabulary`}</SubmitButton>
          </Form>
        </Box>
      </Dialog>
    </Namespace.Provider>
  );
};

export default CreateVocabularyForm;
