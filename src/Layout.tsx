import React from "react";
import NavigationTab from "./components/NavigationTab";
import t from "./components/i18n";
import { Locale } from "./@types";
import { AppBar, Box, IconButton, Typography } from "@mui/material";
import Icon from "./components/Icon";

interface Props {
  children: React.ReactNode;
  setLanguage: (language: Locale) => void;
}

const Layout: React.FC<Props> = (props) => {
  return (
    <div>
      <AppBar
        position={"sticky"}
        sx={{
          background: "linear-gradient(90deg, #2C397E, 10.42%, #1B96B9 100%)"
        }}
      >
        <Box flex={1}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton edge="start" color="inherit" size="large">
                <Icon />
              </IconButton>
              <Typography variant={"h5"}>{t`controlPanel`}</Typography>
            </Box>
            <NavigationTab />
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <button onClick={() => props.setLanguage("en")}>English</button>
              <button onClick={() => props.setLanguage("cs")}>Čeština</button>
            </Box>
          </Box>


        </Box>
      </AppBar>
      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above.
          For now it is removed
          TODO: Return outlet
          */}

      <div>{props.children}</div>
    </div>
  );
};

export default Layout;
