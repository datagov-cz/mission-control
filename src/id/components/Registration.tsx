import React from 'react'
import { useDispatch } from 'react-redux'
import { TextField, Button, Box } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import t from 'components/i18n'
import PasswordTextField from 'components/form/PasswordTextField'
import { Actions } from 'app/actions'
import { LoginPayload } from 'id/types'

const Registration: React.FC = () => {
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const onSubmit = (data: Record<string, any>) => {
    dispatch(Actions.Id.login.request(data as LoginPayload))
    console.log(data)
  }
  return (
    <form className="Registration" onSubmit={handleSubmit(onSubmit)}>
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
        {t`registerAction`}
      </Button>
      <Box m={2} />
    </form>
  )
}

export default Registration
