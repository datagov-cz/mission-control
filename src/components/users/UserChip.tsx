import React from "react";

import { User } from "@types";

// TODO: improve the user chip in the future
//import Gravatar from "components/users/Gravatar";

type UserChipProps = User;

const UserChip: React.FC<UserChipProps> = ({ firstName, lastName }) => {
  return (
    <>
      {firstName} {lastName}
    </>
  );
  /*return (
    <Chip
      label={`${firstName} ${lastName}`}
      //avatar={<Gravatar initials={initials} size="small" />}
      sx={{
        background: "transparent",
        margin: -0.75,
      }}
    />
  );*/
};

export default UserChip;
