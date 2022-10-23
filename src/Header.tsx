import { AppBar, Box, IconButton, Typography } from "@mui/material";
import Icon from "./components/Icon";
import t from "./components/i18n";
import NavigationTab from "./components/NavigationTab";
import { MyUserProfile } from "./components/user/UserProfiles";
import LanguageSelector from "./components/LanguageSelector";
import React from "react";

const Header: React.FC = () => {
  return (<AppBar
    position={"sticky"}
    sx={{
      background: "linear-gradient(90deg, #2C397E, 10.42%, #1B96B9 100%)",
      paddingLeft: 1,
      paddingRight: 1
    }}
  >
    <Box flex={1}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton edge="start" color="inherit" size="large">
            <Icon />
          </IconButton>
          <Typography variant={"h5"}>{t`controlPanel`}</Typography>
        </Box>
        <NavigationTab />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <MyUserProfile />
          <LanguageSelector />
        </Box>
      </Box>
    </Box>
  </AppBar>);
};

export default Header;