import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    text: {
      primary: "#FFFFFFF",
      secondary: "#00000",
    },
  },
  components: {
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: "#FFFFFF",
        },
      },
    },
  },
});

export default theme;
