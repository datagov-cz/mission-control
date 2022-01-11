import React from "react";
import { useObservableSuspense } from "observable-hooks";
import { Box, Button, Menu, MenuItem, Divider } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { FEATURE_DEMO } from "app/variables";
import t from "components/i18n";
import EditWorkspaceForm from "./EditWorkspaceForm";
import DeleteWorkspaceForm from "./DeleteWorkspaceForm";
import PublishWorkspaceDialog from "./PublishWorkspaceDialog";
import Tools from "./Tools";
import useToggle from "hooks/useToggle";
import { workspaceResource } from "data/workspaces";
import { workspaceVocabulariesResource } from "data/vocabularies";

const WorkspaceActions: React.FC = () => {
  const workspace = useObservableSuspense(workspaceResource);
  const workspaceVocabularies = useObservableSuspense(
    workspaceVocabulariesResource
  );

  const publish = useToggle();
  const del = useToggle();
  const edit = useToggle();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const editOpen = () => {
    edit.open();
    handleClose();
  };

  const deleteOpen = () => {
    del.open();
    handleClose();
  };

  return (
    <>
      <Box my={2} display="flex" flexDirection="row">
        <Tools
          workspace={{ ...workspace, vocabularies: workspaceVocabularies }}
        />
        <Button
          color="primary"
          variant="contained"
          onClick={publish.open}
          disabled={FEATURE_DEMO}
        >
          {t`publish`}
        </Button>
        <Box m={1} />
        <Button
          onClick={handleClick}
          endIcon={<ExpandMoreIcon />}
          variant="contained"
        >
          {t`advanced`}
        </Button>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={editOpen}>{t`editWorkspace`}</MenuItem>
          <Divider />
          <MenuItem onClick={deleteOpen}>{t`deleteWorkspace`}</MenuItem>
        </Menu>
      </Box>
      <PublishWorkspaceDialog
        isOpen={publish.isOpen}
        onClose={publish.close}
        workspace={workspace}
      />
      <EditWorkspaceForm
        isOpen={edit.isOpen}
        onClose={edit.close}
        workspace={workspace}
      />
      <DeleteWorkspaceForm
        isOpen={del.isOpen}
        onClose={del.close}
        workspace={workspace}
      />
    </>
  );
};

export default WorkspaceActions;
