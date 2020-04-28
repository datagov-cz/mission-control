import React from 'react'
import { TextField, Button, Box } from '@material-ui/core'
import t from 'app/components/i18n'
import PasswordTextField from './PasswordTextField'
import Actions from 'app/actions'

import useActionForm from 'app/hooks/useActionForm'

const Login: React.FC = () => {
  const { register, errors, onSubmit } = useActionForm(Actions.Id.login.request)
  return (
    <form className="Login" onSubmit={onSubmit}>
      <TextField
        name="username"
        label={t`email`}
        inputRef={register({ required: t`errorRequired` })}
        error={!!errors.username}
        helperText={errors.username?.message}
      />
      <PasswordTextField
        name="password"
        label={t`password`}
        inputRef={register({ required: t`errorRequired` })}
        error={!!errors.password}
        helperText={errors.password?.message}
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
