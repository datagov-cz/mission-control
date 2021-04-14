import React, { useEffect, useState } from "react";
import { Subscription } from "rxjs";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Typography,
  Box,
  Button,
} from "@material-ui/core";

import { Workspace } from "@types";

import t from "components/i18n";
import { publishWorkspace } from "data/workspaces";

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

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{t`publishingWorkspace`}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {prUri ? (
            <>
              <Typography paragraph>{t`workspacePRCreated`}</Typography>
              <Typography paragraph>
                <a href={prUri} target="_blank" rel="noopener noreferrer">
                  {prUri}
                </a>
              </Typography>
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
