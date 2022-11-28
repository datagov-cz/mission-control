import React from "react";
import { ActionButton } from "../../common/ActionButton";
import { Typography } from "@mui/material";
import t from "../../i18n";
import SettingsIcon from "@mui/icons-material/Settings";
import { publishProjectPromise } from "../../../api/ProjectAPI";
import { ProjectData } from "../../../@types";

interface PublishButtonProps {
  project: ProjectData;
}
//TODO: Add spinner and fancy resolvers
const PublishButton: React.FC<PublishButtonProps> = ({ project }) => {
  const onClickHandler = () => {
    publishProjectPromise(project)
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };
  return (
    <ActionButton
      variant="contained"
      onClick={onClickHandler}
      startIcon={<SettingsIcon sx={{ marginLeft: "16px" }} />}
    >
      <Typography variant={"subtitle2"}>{t`publish`}</Typography>
    </ActionButton>
  );
};
export default PublishButton;
