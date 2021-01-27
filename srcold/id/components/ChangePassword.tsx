import React from 'react'
import { Button, Box } from '@material-ui/core'

import t from 'app/components/i18n'
import Actions from 'app/actions'
import useActionForm from 'app/hooks/useActionForm'
import useNavigateTo from 'app/hooks/useNavigateTo'
import Routes from 'app/routes'
import PasswordTextField from './PasswordTextField'

const ChangePassword: React.FC = () => {
  const { register, errors, onSubmit } = useActionForm(
    Actions.Id.changePassword.request
  )
  const navigateToProfile = useNavigateTo(Routes.MeProfile)
  return (
    <Box width={300} mx="auto">
      <form className="ChangePassword" onSubmit={onSubmit}>
        <PasswordTextField
          name="originalPassword"
          label={t`originalPassword`}
          inputRef={register({ required: t`errorRequired` })}
          error={!!errors.originalPassword}
          helperText={errors.originalPassword?.message}
        />
        <PasswordTextField
          name="password"
          label={t`newPassword`}
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
          {t`saveChanges`}
        </Button>
        <Box m={1} />
        <Button fullWidth size="large" onClick={navigateToProfile}>
          {t`cancel`}
        </Button>
      </form>
    </Box>
  )
}

export default ChangePassword
