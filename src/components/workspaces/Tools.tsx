import React from 'react'
import { Button, Box } from '@material-ui/core'

import tools from 'app/tools.json'

import t from 'components/i18n'

type ToolProps = { workspaceUri?: string }

const Tools: React.FC<ToolProps> = (props: ToolProps) => {
  return (
    <>
      {tools.map((tool) => (
        <React.Fragment key={tool.url}>
          <Button
            key={`${tool.url}?workspace=${props.workspaceUri}`}
            color="primary"
            variant="contained"
            href={`${tool.url}?workspace=${props.workspaceUri}`}
            target="_blank"
            onClick={(e) => e.stopPropagation()}
          >
            {t(tool.key)}
          </Button>
          <Box m={1} />
        </React.Fragment>
      ))}
    </>
  )
}

export default Tools
