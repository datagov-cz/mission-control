import React from 'react'
import { TextField, Button, Box } from '@material-ui/core'

import t from 'app/components/i18n'
import PasswordTextField from './PasswordTextField'
import Actions from 'app/actions'
import useActionForm from 'app/hooks/useActionForm'
import { USERNAME_EXISTS_URL } from 'id/constants'
import { getJSON } from 'app/utils/ajax'
import emailRegex from 'app/utils/emailRegex'

const getUsernameExists = async (value: string) =>
  !(await getJSON(`${USERNAME_EXISTS_URL}${value}`).toPromise())

const Registration: React.FC = () => {
  const { register, errors, onSubmit } = useActionForm(
    Actions.Id.register.request
  )
  return (
    <form className="Registration" onSubmit={onSubmit}>
      <TextField
        name="firstName"
        label={t`firstName`}
        inputRef={register({ required: t`errorRequired` })}
        error={!!errors.firstName}
        helperText={errors.firstName?.message}
      />
      <TextField
        name="lastName"
        label={t`lastName`}
        inputRef={register({ required: t`errorRequired` })}
        error={!!errors.lastName}
        helperText={errors.lastName?.message}
      />
      <TextField
        name="username"
        label={t`email`}
        inputRef={register({
          required: t`errorRequired`,
          pattern: {
            value: emailRegex,
            message: t`errorInvalidEmail`,
          },
          validate: async (value) =>
            (await getUsernameExists(value)) || t`errorEmailExists`,
        })}
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
        {t`registerAction`}
      </Button>
      <Box m={2} />
    </form>
  )
}

export default Registration
