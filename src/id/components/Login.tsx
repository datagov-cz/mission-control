import React from 'react'
import { useDispatch } from 'react-redux'
import { TextField, Button, Box } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import t from 'components/t'
import PasswordTextField from 'components/form/PasswordTextField'
import { Actions } from 'app/actions'
import { LoginPayload } from 'id/types'

const Login: React.FC = () => {
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const onSubmit = (data: Record<string, any>) => {
    dispatch(Actions.Id.login.request(data as LoginPayload))
    console.log(data)
  }
  return (
    <form className="Login" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        name="username"
        label={t`username`}
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
        {t`login`}
      </Button>
      <Box m={2} />
    </form>
  )
}

export default Login
