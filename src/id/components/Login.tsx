import React from 'react'
import { TextField, Button, Box } from '@material-ui/core'
import t from 'components/i18n'
import PasswordTextField from 'components/form/PasswordTextField'
import Actions from 'app/actions'

import useActionForm from 'app/hooks/useActionForm'

const Login: React.FC = () => {
  const { register, errors, onSubmit } = useActionForm(Actions.Id.login.request)
  return (
    <form className="Login" onSubmit={onSubmit}>
      <TextField
        name="username"
        label={t`email`}
        inputRef={register}
        required
      />
      <PasswordTextField
        name="password"
        label={t`password`}
        inputRef={register}
        required
      />
      <Box m={2} />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        size="large"
      >
        {t`loginAction`}
      </Button>
      <Box m={2} />
    </form>
  )
}

export default Login
