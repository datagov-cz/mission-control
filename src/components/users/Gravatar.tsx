import React from "react";
import md5 from "crypto-js/md5";
import classNames from "classnames";
import { Avatar, Theme } from "@mui/material";

import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    border: "2px solid #FFF",
    background: theme.palette.secondary.main,
  },
  regular: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  huge: {
    width: theme.spacing(25),
    height: theme.spacing(25),
  },
}));

const getGravatarUrl = (email: string) =>
  `https://www.gravatar.com/avatar/${md5(email)}?d=identicon&s=200`;

type GravatarProps = {
  email?: string;
  initials: string;
  size?: "regular" | "huge";
  className?: string;
};

const Gravatar: React.FC<GravatarProps> = ({
  email = null,
  initials,
  size = "regular",
  className,
}) => {
  const classes = useStyles();

  const avatarClassNames = className
    ? className
    : classNames(
        classes.avatar,
        size === "regular" && classes.regular,
        size === "huge" && classes.huge
      );

  return email ? (
    <Avatar src={getGravatarUrl(email)} className={avatarClassNames}>
      {initials}
    </Avatar>
  ) : (
    <Avatar className={avatarClassNames}>{initials}</Avatar>
  );
};

export default Gravatar;
