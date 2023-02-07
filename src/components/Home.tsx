import React from "react";
import { Box, Typography } from "@mui/material";
import t from "./i18n";
import { LastEditProject } from "./project/ProjectCard";
import CreateVocabularyProject from "./vocabulary/CreateVocabularyProject";

const Home: React.FC = () => {
  return (
    <Box py={3}>
      <Typography variant={"h4"} mb={1}>{t`home`}</Typography>
      <Box display={"flex"} flex={3} sx={{minHeight: 300}}>
        <Box mr={2}>
          <LastEditProject id={0}/>
        </Box>
        <Box>
          <LastEditProject id={1}/>
        </Box>
      </Box>
      <CreateVocabularyProject/>
    </Box>
  );
};

export default Home;
