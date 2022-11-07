import React from "react";
import { Typography } from "@mui/material";
import t from "./i18n";
import { LastEditProject } from "./project/ProjectCard";

const Home: React.FC = () => {
  return (
    <div>
      <Typography variant={"h4"}>{t`home`}</Typography>
      <LastEditProject />
    </div>
  );
};

export default Home;
