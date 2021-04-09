import React from "react";
import { Button, Box } from "@material-ui/core";

import tools from "app/tools";

import t from "components/i18n";

type ToolProps = { workspaceUri: string };

const Tools: React.FC<ToolProps> = ({ workspaceUri }) => {
  return (
    <>
      {tools.map((tool) => (
        <React.Fragment key={tool.key}>
          <Button
            color="primary"
            variant="contained"
            href={tool.getUrl(workspaceUri)}
            target="_blank"
            onClick={(e) => e.stopPropagation()}
          >
            {t(tool.key)}
          </Button>
          <Box m={1} />
        </React.Fragment>
      ))}
    </>
  );
};

export default Tools;
