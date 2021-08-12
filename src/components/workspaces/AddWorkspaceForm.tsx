import React, { useCallback } from "react";
import { tap, switchMap } from "rxjs/operators";

import { AddWorkspacePayload } from "@types";
import Routes from "app/routes";

import t from "components/i18n";
import FormDialog, { FormDialogProps } from "components/form/FormDialog";
import TextField from "components/form/TextField";

import { addWorkspace } from "data/workspaces";
import { execute } from "utils/epic";
import useGoTo from "hooks/useGoTo";

type AddWorkspaceFormProps = Pick<FormDialogProps, "isOpen" | "onClose">;

const AddWorkspaceForm: React.FC<AddWorkspaceFormProps> = (props) => {
  const goTo = useGoTo();
  const onSubmit = useCallback(
    (data: AddWorkspacePayload) => {
      execute(
        switchMap(() => addWorkspace(data)),
        tap((id) => {
          Routes.Workspace.onEnter({ id });
          goTo(Routes.Workspace, { id });
        })
      );
    },
    [goTo]
  );

  return (
    <FormDialog
      title={t`addWorkspace`}
      submitLabel={t`addWorkspace`}
      submitPendingLabel={t`addingWorkspace`}
      onSubmit={onSubmit}
      {...props}
    >
      <TextField
        name="label"
        label={t`label`}
        rules={{ required: "common.errorRequired" }}
        autoFocus
      />
    </FormDialog>
  );
};

export default AddWorkspaceForm;
