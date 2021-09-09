import React from "react";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import t from "components/i18n";
import AddWorkspaceForm from "components/workspaces/AddWorkspaceForm";
import useToggle from "hooks/useToggle";

const AddWorkspace: React.FC<{}> = () => {
  const { isOpen, open, close } = useToggle();

  return (
    <>
      <Fab variant="extended" size="medium" color="primary" onClick={open}>
        <AddIcon />
        {t`addWorkspace`}
      </Fab>
      <AddWorkspaceForm isOpen={isOpen} onClose={close} />
    </>
  );
};

export default AddWorkspace;
