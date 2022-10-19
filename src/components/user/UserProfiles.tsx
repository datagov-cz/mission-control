import { Avatar } from "@mui/material";
import { useAuth } from "@opendata-mvcr/assembly-line-shared";
import React from "react";
import { stringAvatar, stringToColor } from "../../utils/UserUtils";
import { User } from "../../@types";

export const MyUserProfile: React.FC = () => {
  const {
    user: {
      profile: { given_name, family_name },
    },
  } = useAuth();
  const fullName = given_name + " " + family_name;
  return (
    <Avatar
      {...stringAvatar(given_name + " " + family_name)}
      sx={{
        bgcolor: stringToColor(fullName),
      }}
    />
  );
};

//TODO: probably user is always passed
interface UserProfileProps {
  user?: User;
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
