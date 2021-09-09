import React from "react";
import { useObservableEagerState } from "observable-hooks";
import { Button, Menu, MenuItem } from "@mui/material";
import TranslateIcon from "@mui/icons-material/Translate";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { Locale } from "@types";

import t, { Namespace } from "./i18n";
import { locale$, setLocale } from "data/locale";

const LanguageSelector: React.FC<{}> = () => {
  const locale = useObservableEagerState(locale$);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const selectLocale = (locale: Locale) => {
    handleClose();
    setLocale(locale);
  };

  const selectCs = () => selectLocale("cs");
  const selectEn = () => selectLocale("en");

  return (
    <Namespace.Provider value="common">
      <Button
        startIcon={<TranslateIcon color="inherit" />}
        endIcon={<ExpandMoreIcon color="inherit" />}
        onClick={handleClick}
        color="inherit"
      >
        {t(locale)}
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={selectCs}>{t`cs`}</MenuItem>
        <MenuItem onClick={selectEn}>{t`en`}</MenuItem>
      </Menu>
    </Namespace.Provider>
  );
};

export default LanguageSelector;
