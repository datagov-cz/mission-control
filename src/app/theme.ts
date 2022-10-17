import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    text: {
      primary: "#000000",
      secondary: "#FFFFFF",
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
