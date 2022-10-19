import React from "react";
import { Typography } from "@mui/material";
import t from "./i18n";

const Home: React.FC = () => {
  return (
    <div>
      <Typography variant={"h4"}>{t`home`}</Typography>
    </div>
  );
};

export default Home;
