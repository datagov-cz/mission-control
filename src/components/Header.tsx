import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
} from "@material-ui/core";

import makeStyles from "@material-ui/styles/makeStyles";

import Icon from "components/Icon";
import t from "components/i18n";
import Help from "components/Help";
import LanguageSelector from "components/LanguageSelector";
import Identity from "components/Identity";
import RouteLink from "components/RouteLink";

const useStyles = makeStyles({
  root: {
    background: "#263238 linear-gradient(5deg, #057fa5 0%, #263238 100%)",
  },
});

const Header: React.FC = () => {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.root}>
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
