import { useQueryClient } from "@tanstack/react-query";
import React, { useCallback } from "react";
import { useIntl } from "react-intl";
import { ToastPromiseParams } from "react-toastify";
import { EditProjectPayload, ProjectData } from "../../@types";
import { editProjectName } from "../../api/VocabularyApi";
import getIdFromIri from "../../utils/getIdFromIri";
import { notifyPromise } from "../common/Notify";
import FormDialog from "../form/FormDialog";
import Hidden from "../form/Hidden";
import TextField from "../form/TextField";
import t from "../i18n";

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
  const onSubmit = useCallback((payload: EditProjectPayload) => {
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
