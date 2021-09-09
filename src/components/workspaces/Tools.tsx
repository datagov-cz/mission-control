import React from "react";
import { Button, Box } from "@mui/material";

import tools from "app/tools";
import { Tool, Workspace } from "@types";

import t from "components/i18n";

type ToolButtonProps = {
  tool: Tool;
  workspace: Workspace;
};

const ToolButton: React.FC<ToolButtonProps> = ({ tool, workspace }) => {
  if (workspace.vocabularies.length > 0) {
    return (
      <Button
        color="primary"
        variant="contained"
        href={tool.getUrl(workspace.uri)}
        target="_blank"
        onClick={(e) => e.stopPropagation()}
      >
        {t(tool.key)}
      </Button>
    );
  } else {
    return (
      <Button color="primary" variant="contained" disabled={true}>
        {t(tool.key)}
      </Button>
    );
  }
};

type ToolsProps = { workspace: Workspace };

const Tools: React.FC<ToolsProps> = ({ workspace }) => {
  return (
    <>
      {tools.map((tool) => (
        <React.Fragment key={tool.key}>
          <ToolButton tool={tool} workspace={workspace} />
          <Box m={1} />
        </React.Fragment>
      ))}
    </>
  );
};

export default Tools;
