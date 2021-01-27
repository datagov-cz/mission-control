import React from 'react'
import { Box, Container } from '@material-ui/core'
import { useSelector } from 'react-redux'

import { Namespace } from 'app/components/i18n'
import RouteComponentRenderer from 'app/components/RouteComponentRenderer'
import Gravatar from 'app/components/Gravatar'
import { getInitials, getUsername } from 'id/selectors'

const MeLayout: React.FC = () => {
  const initials = useSelector(getInitials)
  const email = useSelector(getUsername)
  return (
    <Namespace.Provider value="id">
      <Container className="Me">
        <Box width={200} mx="auto" pt={5} pb={2}>
          <Gravatar email={email} initials={initials} size="huge" />
        </Box>
        <RouteComponentRenderer />
      </Container>
    </Namespace.Provider>
  )
}

export default MeLayout
