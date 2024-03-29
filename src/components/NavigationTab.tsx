import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link, matchPath, useLocation } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import t from "./i18n";

function useRouteMatch(patterns: readonly string[]) {
  const { pathname } = useLocation();

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, pathname);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }

  return null;
}

const NavigationTab = () => {
  const routeMatch = useRouteMatch(["/", "/projects/*", "/vocabularies"]);
  const currentTab = routeMatch?.pattern?.path;

  return (
    <Tabs value={currentTab} textColor={"inherit"}>
      <Tab
        icon={<HomeOutlinedIcon />}
        iconPosition="start"
        label={t`home`}
        value="/"
        to="/"
        component={Link}
      />
      <Tab
        icon={<LibraryBooksOutlinedIcon />}
        iconPosition="start"
        label={t`projects`}
        value="/projects/*"
        to="/projects"
        component={Link}
      />
    </Tabs>
  );
};

export default NavigationTab;
