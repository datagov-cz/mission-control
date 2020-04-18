import React from 'react'
import { TextField, Button, Box } from '@material-ui/core'
import T from 'components/T'

const Login: React.FC = () => (
  <form className="Login">
    <TextField label={<T>name</T>} />
    <TextField label={<T>password</T>} />
    <Box m={2} />
    <Button variant="contained" color="primary" fullWidth size="large">
      <T>login</T>
    </Button>
    <Box m={2} />
  </form>
)

export default Login
