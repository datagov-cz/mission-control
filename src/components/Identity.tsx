import React, { useState } from "react";
import { useAuth } from "@datagov-cz/assembly-line-shared";

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
  console.log(given_name, family_name, email);
  return (
    <>
      <h2>
        {given_name}
        {family_name}
      </h2>
      <button onClick={logout}>Loggout</button>
    </>
  );
};

export default Identity;
