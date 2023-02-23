import React from "react";
import { Box } from "@mui/material";
import CreateVocabularyProject from "./vocabulary/CreateVocabularyProject";
import MyRecentProjects from "./project/MyRecentProjects";
import CreateVocabulary from "./vocabulary/CreateVocabulary";

const Home: React.FC = () => {
  return (
    <Box py={3}>
      <MyRecentProjects/>
      <CreateVocabulary/>
      <CreateVocabularyProject/>
    </Box>
  );
};

export default Home;
