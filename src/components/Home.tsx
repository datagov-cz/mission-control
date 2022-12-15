import React from "react";
import { Box, Typography } from "@mui/material";
import t from "./i18n";
import { LastEditProject } from "./project/ProjectCard";
import Vocabularies from "./vocabulary/Vocabularies";

const Home: React.FC = () => {
  return (
    <div>
      <Typography variant={"h4"}>{t`home`}</Typography>
      <Box display={"flex"} flex={3} sx={{minHeight: 300}}>
        <Box mr={2}>
          <LastEditProject />
        </Box>
        <Box>
          <LastEditProject />
        </Box>
      </Box>
      <Vocabularies/>
    </div>
  );
};

export default Home;
