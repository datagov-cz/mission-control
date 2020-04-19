import React from 'react'
import { useDispatch } from 'react-redux'
import { TextField, Button, Box } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import t from 'components/t'
import PasswordTextField from 'components/form/PasswordTextField'
import { Action } from 'app/actions'

const Login: React.FC = () => {
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const onSubmit = (data: any) => {
    //dispatch(Action.)
    console.log(data)
  }
  return (
    <form className="Login" onSubmit={handleSubmit(onSubmit)}>
      <TextField name="name" label={t`name`} inputRef={register} required />
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
