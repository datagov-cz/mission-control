import React from "react";
import md5 from "crypto-js/md5";
import { Avatar } from "@mui/material";
import { styled } from "@mui/system";

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  border: "2px solid #FFF",
  background: theme.palette.secondary.main,
}));

const getGravatarUrl = (email: string) =>
  `https://www.gravatar.com/avatar/${md5(email)}?d=identicon&s=200`;

type GravatarProps = {
  email?: string;
  initials: string;
  size?: "regular" | "small";
};

const Gravatar: React.FC<GravatarProps> = ({
  email = null,
  initials,
  size = "regular",
}) => {
  const sizePoints = size !== "regular" ? 30 : 40;

  const sx = {
    width: sizePoints,
    height: sizePoints,
  };

  return email ? (
    <StyledAvatar src={getGravatarUrl(email)} sx={sx}>
      {initials}
    </StyledAvatar>
  ) : (
    <StyledAvatar sx={sx} variant="rounded">
      {initials}
    </StyledAvatar>
  );
};

export default Gravatar;
