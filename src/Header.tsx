import { AppBar, Box, IconButton, Typography } from "@mui/material";
import Icon from "./components/Icon";
import t from "./components/i18n";
import NavigationTab from "./components/NavigationTab";
import { MyUserProfile } from "./components/user/UserProfiles";
import LanguageSelector from "./components/LanguageSelector";
import React from "react";
import { LINEAR_BACKGROUND } from "./utils/Constants";

const Header: React.FC = () => {
  return (
    <AppBar
      position={"sticky"}
      sx={{
        background: LINEAR_BACKGROUND,
        paddingLeft: 1,
        paddingRight: 1,
      }}
    >
      <Box flex={1}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
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
    </AppBar>
  );
};

export default Header;
