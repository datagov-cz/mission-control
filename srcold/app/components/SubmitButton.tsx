import React from 'react'
import { Button, ButtonProps } from '@material-ui/core'

const SubmitButton: React.FC<ButtonProps> = (props) => (
  <Button
    color="primary"
    variant="contained"
    fullWidth
    size="large"
    {...props}
  />
)

export default SubmitButton
