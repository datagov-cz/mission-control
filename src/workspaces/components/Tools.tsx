import React from 'react'
import { useSelector } from 'react-redux'
import { getTools } from '../selectors'
import Button from '@material-ui/core/Button'
import { Box } from '@material-ui/core'
import t from 'app/components/i18n'

type ToolProps = { workspaceUri?: string }

const Tools: React.FC<ToolProps> = (props: ToolProps) => {
  const tools = useSelector(getTools)
  return (
    <>
      {tools.map((tool) => (
        <>
          <Button
            key={`${tool.url}?workspace=${props.workspaceUri}`}
            color="primary"
            variant="contained"
            href={`${tool.url}?workspace=${props.workspaceUri}`}
            target="_blank"
          >
            {t(tool.key)}
          </Button>
          <Box m={1} />
        </>
      ))}
    </>
  )
}

export default Tools
