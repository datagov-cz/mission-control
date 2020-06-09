import React from 'react'
import { useSelector } from 'react-redux'
import { getTools } from '../selectors'
import Button from '@material-ui/core/Button'

type ToolProps = { workspaceUri: string }

const Tools: React.FC<ToolProps> = (props: ToolProps) => {
  const tools = useSelector(getTools)
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }
  return (
    <>
      {tools.map((t) => (
        <Button
          key={`${t.url}?workspace=${props.workspaceUri}`}
          onClick={handleClick}
          color="secondary"
          href={`${t.url}?workspace=${props.workspaceUri}`}
        >
          {t.label}
        </Button>
      ))}
    </>
  )
}

export default Tools
