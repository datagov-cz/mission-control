import React from "react";
import { Chip, Theme } from "@mui/material";

import makeStyles from "@mui/styles/makeStyles";

import { User } from "@types";

import Gravatar from "components/users/Gravatar";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: "transparent",
    margin: theme.spacing(-0.75, -0.75),
  },
}));

type UserChipProps = User;

const UserChip: React.FC<UserChipProps> = ({
  initials,
  firstName,
  lastName,
}) => {
  const classes = useStyles();
  return (
    <Chip
      label={`${firstName} ${lastName}`}
      avatar={<Gravatar initials={initials} />}
      classes={classes}
    />
  );
};

export default UserChip;
