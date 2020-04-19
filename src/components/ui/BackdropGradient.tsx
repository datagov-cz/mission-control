import { Box } from '@material-ui/core'
import { styled } from '@material-ui/core/styles'

const BackdropGradient = styled(Box)({
  background: '#263238 radial-gradient(circle, #880e4f 0%, #263238 100%)',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
})

export default BackdropGradient
