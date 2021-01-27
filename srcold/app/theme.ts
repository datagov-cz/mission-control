import { createMuiTheme } from '@material-ui/core/styles'
import { grey, blueGrey } from '@material-ui/core/colors'

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  palette: {
    primary: {
      main: '#057fa5',
    },
    secondary: {
      main: blueGrey[400],
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          backgroundColor: grey[200],
        },
      },
    },
  },
  props: {
    MuiTextField: {
      variant: 'filled', // Sets filled input variant as default
      margin: 'normal',
      fullWidth: true,
    },
    MuiInputLabel: {
      required: false, // Hides asterisk in labels for required fields by default
    },
  },
})

export default theme
