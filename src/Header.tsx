import { AppBar, Box, IconButton, styled, Typography } from "@mui/material";
import Icon from "./components/Icon";
import t from "./components/i18n";
import NavigationTab from "./components/NavigationTab";
import { MyUserProfile } from "./components/user/UserProfiles";
import LanguageSelector from "./components/LanguageSelector";
import React from "react";
import { LINEAR_BACKGROUND } from "./utils/Constants";
import { Link } from "react-router-dom";

const UnstyledLink = styled(Link)(() => ({
  color: "white",
  textDecoration: "none",
}));

const Header: React.FC = () => {
  return (
    <AppBar
      position={"sticky"}
      sx={{
        background: LINEAR_BACKGROUND,
        paddingLeft: 4,
        paddingRight: 4,
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
          <UnstyledLink to={"/"}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box mr={2}>
                <Icon />
              </Box>
              <Typography variant={"h5"}>{t`controlPanel`}</Typography>
            </Box>
          </UnstyledLink>
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
