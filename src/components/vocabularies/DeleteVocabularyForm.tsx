import React, { useCallback } from "react";
import { finalize, switchMap } from "rxjs/operators";
import { Typography } from "@mui/material";

import { DeleteVocabularyPayload, Vocabulary, Workspace } from "@types";

import t from "components/i18n";
import FormDialog, { FormDialogProps } from "components/form/FormDialog";
import Hidden from "components/form/Hidden";
import {
  deleteVocabulary,
  fetchWorkspaceVocabularies,
} from "data/vocabularies";
import { execute } from "utils/epic";

type DeleteVocabularyFormProps = Pick<FormDialogProps, "isOpen" | "onClose"> & {
  workspace?: Workspace;
  vocabulary?: Vocabulary;
};

const DeleteVocabularyForm: React.FC<DeleteVocabularyFormProps> = ({
  isOpen,
  onClose,
  workspace,
  vocabulary,
}) => {
  const onSubmit = useCallback(
    (data: DeleteVocabularyPayload) =>
      execute(
        switchMap(() => deleteVocabulary(data)),
        switchMap(() => fetchWorkspaceVocabularies(workspace!.id)),
        finalize(onClose)
      ),
    [onClose, workspace]
  );

  return (
    <FormDialog
      isOpen={isOpen}
      title={t`reallyDeleteVocabulary`}
      submitLabel={t`confirmDelete`}
      submitPendingLabel={t`deletingVocabulary`}
      onClose={onClose}
      onSubmit={onSubmit}
    >
      <Hidden name="workspaceId" value={workspace?.id || ""} />
      <Hidden name="vocabularyIri" value={vocabulary?.vocabulary || ""} />
      <Typography paragraph>{t`areYouSureToDeleteVocabulary`}</Typography>
    </FormDialog>
  );
};

export default DeleteVocabularyForm;
