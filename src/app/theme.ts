import { createTheme, ThemeOptions } from "@material-ui/core/styles";
import { grey, blueGrey } from "@material-ui/core/colors";
import { csCZ, enUS } from "@material-ui/core/locale";
import { csCZ as csCZgrid, enUS as enUSgrid } from "@material-ui/data-grid";

import { Locale } from "@types";

const themeOptions: ThemeOptions = {
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  palette: {
    primary: {
      main: "#057fa5",
    },
    secondary: {
      main: blueGrey[400],
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: "filled", // Sets filled input variant as default
        margin: "normal",
        fullWidth: true,
        autoComplete: "off",
      },
    },
    MuiInputLabel: {
      defaultProps: {
        required: false, // Hides asterisk in labels for required fields by default
      },
    },
    MuiButtonBase: {
      defaultProps: {
        centerRipple: true,
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        "@global": {
          body: {
            backgroundColor: grey[200],
          },
        },
      },
    },
  },
};

export const createLocalizedTheme = (locale: Locale) => {
  if (locale === "en") {
    return createTheme(themeOptions, enUS, enUSgrid);
  }
  return createTheme(themeOptions, csCZ, csCZgrid);
};
