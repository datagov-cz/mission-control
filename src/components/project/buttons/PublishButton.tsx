import React, { useState } from "react";
import { ActionButton, ActionButtonProps } from "../../common/ActionButton";
import { Typography } from "@mui/material";
import t, { Namespace } from "../../i18n";
import { publishProjectPromise } from "../../../api/ProjectAPI";
import { ProjectDetailProps } from "../Project";
import { toast, ToastPromiseParams } from "react-toastify";
import { useIntl } from "react-intl";
import { notifyPromise } from "../../common/Notify";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { FEATURE_DEMO } from "../../../app/variables";

const PublishButton: React.FC<ProjectDetailProps & ActionButtonProps> = ({
  project,
  disabled = false,
}) => {
  const [isWaiting, setIsWaiting] = useState(false);
  const isDisabled = isWaiting || disabled || FEATURE_DEMO;
  const intl = useIntl();
  const ToastWithLink = (url: string) => (
    <Namespace.Provider value="workspaces">
      <div>
        <Typography variant={"body1"}>{t`projectPRCreated`}</Typography>
        <a rel="noreferrer" target={"_blank"} href={url}>
          {url}
        </a>
      </div>
    </Namespace.Provider>
  );
  const formatProjectCreationMessage = (): ToastPromiseParams => {
    const pending = `${intl.messages["workspaces.publishingWorkspacePleaseWait"]} `;
    const success = `${intl.messages["workspaces.publishWorkspaceSuccess"]} 🎉`;
    const error = `${intl.messages["workspaces.publishWorkspaceError"]}`;

    return {
      pending: pending,
      success: success,
      error: error,
    };
  };
  const onClickHandler = () => {
    setIsWaiting(true);
    notifyPromise(
      publishProjectPromise(project),
      formatProjectCreationMessage()
    )
      .then((data: any) => {
        toast.info(ToastWithLink(data.headers["location"]), {
          autoClose: 30000,
        });
        setIsWaiting(false);
      })
      .catch(() => setIsWaiting(false));
  };
  return (
    <ActionButton
      sx={{ minWidth: 170 }}
      variant="contained"
      onClick={onClickHandler}
      startIcon={<CloudUploadIcon />}
      disabled={isDisabled}
    >
      <Typography variant={"subtitle2"}>{t`publish`}</Typography>
    </ActionButton>
  );
};
export default PublishButton;
