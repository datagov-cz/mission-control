import React, { useState } from "react";
import { ProjectDetailProps } from "../Project";
import { Badge, Box, ButtonProps, Typography } from "@mui/material";
import { toast, ToastPromiseParams } from "react-toastify";
import { useIntl } from "react-intl";
import { notifyPromise } from "../../common/Notify";
import { compareChangesInCheckItPromise } from "../../../api/ProjectAPI";
import t, { Namespace } from "../../i18n";
import { ActionButton } from "../../common/ActionButton";
import { CHECKIT_FRONTED_URL } from "../../../app/variables";
import PreviewIcon from "@mui/icons-material/Preview";

const CheckItButton: React.FC<ProjectDetailProps & ButtonProps> = ({
  project,
  disabled = false,
}) => {
  const intl = useIntl();
  const [isWaiting, setIsWaiting] = useState(false);
  const isDisabled = isWaiting || disabled;
  const ToastWithLink = (url: string) => (
    <Namespace.Provider value="workspaces">
      <div>
        <Typography variant={"body1"}>{t`publicationCreated`}</Typography>
        <a rel="noreferrer" target={"_blank"} href={url}>
          {url}
        </a>
      </div>
    </Namespace.Provider>
  );
  const formatCheckItMessage = (): ToastPromiseParams => {
    const pending = `${intl.messages["workspaces.creatingPublication"]} `;
    const success = `${intl.messages["workspaces.creatingPublicationSuccess"]} 🎉`;
    const error = `${intl.messages["workspaces.publicationError"]}`;

    return {
      pending: pending,
      success: success,
      error: error,
    };
  };
  const onClickHandler = () => {
    setIsWaiting(true);
    notifyPromise(
      compareChangesInCheckItPromise(project),
      formatCheckItMessage()
    )
      .then((data: any) => {
        toast.info(ToastWithLink(CHECKIT_FRONTED_URL), {
          autoClose: 3000,
        });
        setIsWaiting(false);
      })
      .catch(() => setIsWaiting(false));
  };

  return (
    <Box flex={1}>
      <Badge badgeContent={"BETA"} color={"secondary"}>
        <ActionButton
          sx={{ minWidth: 170 }}
          variant="contained"
          onClick={onClickHandler}
          startIcon={<PreviewIcon />}
          disabled={isDisabled}
        >
          <Typography variant={"subtitle2"}>{t`createPublication`}</Typography>
        </ActionButton>
      </Badge>
    </Box>
  );
};

export default CheckItButton;
