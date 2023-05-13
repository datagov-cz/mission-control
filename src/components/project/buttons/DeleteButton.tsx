import React, { useState } from "react";
import { ProjectDetailProps } from "../Project";
import { deleteProjectPromise } from "../../../api/ProjectAPI";
import { ActionButton } from "../../common/ActionButton";
import { ButtonProps, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import t from "../../i18n";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { notifyPromise } from "../../common/Notify";
import { ToastPromiseParams } from "react-toastify";
import { useIntl } from "react-intl";
import DeleteProjectAlert from "../../form/DeleteProjectAlert";
import useToggle from "../../../hooks/useToggle";

const DeleteButton: React.FC<ProjectDetailProps & ButtonProps> = ({
  project,
  disabled,
}) => {
  const [isWaiting, setIsWaiting] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const intl = useIntl();
  const { isOpen, open, close } = useToggle();
  const formatProjectCreationMessage = (): ToastPromiseParams => {
    const pending = `${intl.messages["workspaces.deletingProject"]} `;
    const success = `${intl.messages["workspaces.deleteProjectSuccess"]} 🎉`;
    const error = `${intl.messages["common.somethingWentWrong"]}`;

    return {
      pending: pending,
      success: success,
      error: error,
    };
  };
  const onClickHandler = () => {
    setIsWaiting(true);
    notifyPromise(deleteProjectPromise(project), formatProjectCreationMessage())
      .then(() => {
        setIsWaiting(false);
        queryClient
          .invalidateQueries(["projects"])
          .then((r) => navigate("/projects"));
      })
      .catch(() => setIsWaiting(false));
  };
  return (
    <>
      <ActionButton
        sx={{ minWidth: 170 }}
        variant="contained"
        startIcon={<DeleteIcon />}
        onClick={open}
        disabled={isWaiting || disabled}
      >
        <Typography variant={"subtitle2"}>{t`deleteWorkspace`}</Typography>
      </ActionButton>
      <DeleteProjectAlert
        isOpen={isOpen}
        onClose={close}
        onSubmit={onClickHandler}
      />
    </>
  );
};
export default DeleteButton;
