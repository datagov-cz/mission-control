import React, { useEffect, useState, useCallback } from "react";
import { Subscription } from "rxjs";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Typography,
  Box,
  Button,
} from "@mui/material";

import { Workspace } from "@types";

import t from "components/i18n";
import { deleteWorkspace, publishWorkspace } from "data/workspaces";
import useGoTo from "hooks/useGoTo";
import { execute } from "utils/epic";
import { finalize, switchMap } from "rxjs/operators";
import Routes from "app/routes";

type PublishWorkspaceDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  workspace: Workspace;
};

const PublishWorkspaceDialog: React.FC<PublishWorkspaceDialogProps> = ({
  isOpen,
  onClose,
  workspace,
}) => {
  const [prUri, setPrUri] = useState<string>();

  useEffect(() => {
    let subscription: Subscription | undefined = undefined;
    if (isOpen) {
      subscription = publishWorkspace(workspace).subscribe(setPrUri);
    }
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
      setPrUri(undefined);
    };
  }, [isOpen, workspace]);

  const goTo = useGoTo();

  const handleDelete = useCallback(() => {
    execute(
      switchMap(() => deleteWorkspace(workspace)),
      finalize(() => {
        goTo(Routes.Workspaces);
      })
    );
  }, [workspace, goTo]);

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{t`publishingWorkspace`}</DialogTitle>
      <DialogContent>
        <DialogContentText component="div">
          {prUri ? (
            <>
              <Typography paragraph>{t`workspacePRCreated`}</Typography>
              <Typography paragraph>
                <a href={prUri} target="_blank" rel="noopener noreferrer">
                  {prUri}
                </a>
              </Typography>
              <Typography paragraph>{t`workspaceMayBeDeleted`}</Typography>
              <Box my={1} />
              <Button
                onClick={handleDelete}
                color="primary"
                fullWidth
                size="large"
                variant="contained"
              >
                {t`deleteWorkspace`}
              </Button>
              <Box my={1} />
              <Button onClick={onClose} color="primary" fullWidth size="large">
                {t`common.cancel`}
              </Button>
            </>
          ) : (
            t`publishingWorkspacePleaseWait`
          )}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default PublishWorkspaceDialog;
