import React from "react";
import { ProjectDetailProps } from "../Project";
import { deleteProjectPromise } from "../../../api/ProjectAPI";
import { ActionButton } from "../../common/ActionButton";
import { Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import t from "../../i18n";
import { useNavigate } from "react-router-dom";

const DeleteButton: React.FC<ProjectDetailProps> = ({ project }) => {
  const navigate = useNavigate();
  const onClickHandler = () => {
    deleteProjectPromise(project)
      .then((data) => navigate("/projects"))
      .catch((err) => console.log(err));
  };
  return (
    <ActionButton
      variant="contained"
      onClick={onClickHandler}
      startIcon={<DeleteIcon />}
    >
      <Typography variant={"subtitle2"}>{t`deleteWorkspace`}</Typography>
    </ActionButton>
  );
};
export default DeleteButton;