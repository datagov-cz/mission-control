import React, { useCallback } from "react";
import { EditWorkspacePayload, ProjectData } from "../../@types";
import t from "../i18n";
import FormDialog from "../form/FormDialog";
import Hidden from "../form/Hidden";
import TextField from "../form/TextField";
import { notifyPromise } from "../common/Notify";
import { createVocabulary, editProjectName } from "../../api/VocabularyApi";
import { useQueryClient } from "@tanstack/react-query";
import getIdFromIri from "../../utils/getIdFromIri";
import { ToastPromiseParams } from "react-toastify";
import { useIntl } from "react-intl";

interface RenameProjectForm {
  project: ProjectData;
  isOpen: boolean;
  onClose: () => void;
}
const RenameProjectForm: React.FC<RenameProjectForm> = ({
  project,
  isOpen,
  onClose,
}) => {
  const intl = useIntl();
  const formatProjectCreationMessage = (): ToastPromiseParams => {
    const pending = `${intl.messages["workspaces.editingProject"]} `;
    const success = `${intl.messages["workspaces.editProjectSuccess"]} 🎉`;
    const error = `${intl.messages["common.somethingWentWrong"]}`;

    return {
      pending: pending,
      success: success,
      error: error,
    };
  };
  const queryClient = useQueryClient();
  const onSubmit = useCallback((payload: EditWorkspacePayload) => {
    notifyPromise(
      editProjectName(payload),
      formatProjectCreationMessage()
    ).then(() => {
      onClose();
      queryClient.invalidateQueries(["projects"]);
      queryClient.invalidateQueries(["projectsID", getIdFromIri(project.uri)]);
    });
  }, []);

  return (
    <FormDialog
      isOpen={isOpen}
      onClose={onClose}
      title={t`editProject`}
      submitLabel={t`editProject`}
      submitPendingLabel={t`editingProject`}
      onSubmit={onSubmit}
    >
      <Hidden name="uri" value={project.uri} />

      <TextField
        sx={{ marginTop: 2 }}
        fullWidth
        name="label"
        label={t`label`}
        rules={{ required: "common.errorRequired" }}
        defaultValue={project.label}
      />
    </FormDialog>
  );
};

export default RenameProjectForm;
