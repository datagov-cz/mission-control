import React from 'react'
import { useSelector } from 'react-redux'
import { TextField, Button, Box } from '@material-ui/core'

import t from 'app/components/i18n'
import Actions from 'app/actions'
import useActionForm from 'app/hooks/useActionForm'
import { getIdentity } from 'id/selectors'
import useNavigateTo from 'app/hooks/useNavigateTo'
import Routes from 'app/routes'

const EditProfile: React.FC = () => {
  const identity = useSelector(getIdentity)
  const { register, errors, onSubmit } = useActionForm(
    Actions.Id.editProfile.request
  )
  const navigateToProfile = useNavigateTo(Routes.MeProfile)
  return (
    <Box width={300} mx="auto">
      <form className="EditProfile" onSubmit={onSubmit}>
        <TextField
          name="firstName"
          label={t`firstName`}
          defaultValue={identity.firstName}
          inputRef={register({ required: t`errorRequired` })}
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
        />
        <TextField
          name="lastName"
          label={t`lastName`}
          defaultValue={identity.lastName}
          inputRef={register({ required: t`errorRequired` })}
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
        />
        <Box m={2} />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
        >
          {t`editProfileAction`}
        </Button>
        <Box m={1} />
        <Button fullWidth size="large" onClick={navigateToProfile}>
          {t`cancel`}
        </Button>
      </form>
    </Box>
  )
}

export default EditProfile
