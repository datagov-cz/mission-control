import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Box } from "@mui/material";

import Icon from "components/Icon";
import t from "components/i18n";
import Help from "components/Help";
import LanguageSelector from "components/LanguageSelector";
import Identity from "components/Identity";
import RouteLink from "components/RouteLink";

const Header: React.FC = () => {
  return (
    <AppBar
      position="static"
      sx={{
        background: "#263238 linear-gradient(5deg, #057fa5 0%, #263238 100%)",
      }}
    >
      <Toolbar>
        <RouteLink
          route="/"
          sx={{ display: "flex", alignItems: "center", color: "white" }}
        >
          <IconButton edge="start" color="inherit" size="large">
            <Icon />
          </IconButton>
          <Typography variant="h6">{t`controlPanel`}</Typography>
        </RouteLink>
        <Box display="flex" flexGrow={1} justifyContent="flex-end">
          <Help />
          <LanguageSelector />
          <Identity />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
