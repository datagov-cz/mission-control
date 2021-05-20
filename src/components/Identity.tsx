import React, { useState } from "react";
import {
  MenuItem,
  Menu,
  Button,
  Typography,
  ListItemIcon,
} from "@material-ui/core";
import { ExitToApp } from "@material-ui/icons";
import { useAuth } from "@opendata-mvcr/assembly-line-shared";

import Gravatar from "components/users/Gravatar";
import t, { Namespace } from "components/i18n";

const Identity: React.FC = () => {
  const {
    user: {
      profile: { given_name, family_name, email },
    },
    logout,
  } = useAuth();

  const initials = `${given_name?.charAt(0)}${family_name?.charAt(0)}`;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Namespace.Provider value="common">
      <Button onClick={handleClick}>
        <Gravatar email={email!} initials={initials} />
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <Typography variant="inherit">{t`logout`}</Typography>
        </MenuItem>
      </Menu>
    </Namespace.Provider>
  );
};

export default Identity;
