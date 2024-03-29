import { useAuth } from "@datagov-cz/assembly-line-shared";
import { Avatar, Box, Menu, MenuItem, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import React from "react";
import { UserData } from "../../@types";
import { stringAvatar, stringToColor } from "../../utils/UserUtils";
import { CenteredSpacedOutBox } from "../common/CenteredSpacedOutBox";
import t from "../i18n";

export const MyUserProfile: React.FC = () => {
  const {
    user: {
      profile: { given_name, family_name },
    },
    logout,
  } = useAuth();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const fullName = given_name + " " + family_name;

  return (
    <>
      <CenteredSpacedOutBox>
        <IconButton onClick={handleClick}>
          <Avatar
            {...stringAvatar(given_name + " " + family_name)}
            sx={{
              bgcolor: stringToColor(fullName),
            }}
          />
        </IconButton>
        <Box sx={{ marginRight: 3 }}>
          <Typography variant={"body2"}>{fullName}</Typography>
        </Box>
      </CenteredSpacedOutBox>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => logout()}>{t`logout`}</MenuItem>
      </Menu>
    </>
  );
};

//TODO: probably user is always passed
interface UserProfileProps {
  user?: UserData;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const fullName = user?.firstName + " " + user?.lastName;
  return (
    <Avatar
      {...stringAvatar(user?.firstName + " " + user?.lastName)}
      sx={{
        width: 26,
        height: 26,
        fontSize: 12,
        bgcolor: stringToColor(fullName),
      }}
    />
  );
};
