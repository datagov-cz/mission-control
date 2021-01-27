import React from 'react'
import { useSelector } from 'react-redux'
import { Button, Typography, Box } from '@material-ui/core'

import { getUsername, getIdentity } from 'id/selectors'
import t from 'app/components/i18n'
import Routes from 'app/routes'
import useNavigateTo from 'app/hooks/useNavigateTo'

const Profile: React.FC = () => {
  const email = useSelector(getUsername)
  const { firstName, lastName } = useSelector(getIdentity)
  const navigateToEditProfile = useNavigateTo(Routes.MeEdit)
  const navigateToChangePassword = useNavigateTo(Routes.MeChangePassword)

  return (
    <>
      <Typography variant="h4" align="center" paragraph>
        {email}
      </Typography>
      <Typography variant="h5" align="center">
        {firstName} {lastName}
      </Typography>
      <Box width={300} mx="auto" py={4}>
        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={navigateToEditProfile}
        >
          {t`editProfile`}
        </Button>
        <Box p={1} />
        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={navigateToChangePassword}
        >
          {t`changePassword`}
        </Button>
      </Box>
    </>
  )
}

export default Profile
