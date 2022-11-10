import React from "react";
import { Box, Typography } from "@mui/material";
import t from "./i18n";
import { LastEditProject } from "./project/ProjectCard";

const Home: React.FC = () => {
  return (
    <div>
      <Typography variant={"h4"}>{t`home`}</Typography>
      <Box display={"flex"} flex={3}>
        <Box mr={2}>
          <LastEditProject />
        </Box>
        <Box>
          <LastEditProject />
        </Box>
      </Box>
    </div>
  );
};

export default Home;
