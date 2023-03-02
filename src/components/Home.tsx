import React from "react";
import { Box } from "@mui/material";
import CreateVocabularyProject from "./vocabulary/CreateVocabularyProject";
import MyRecentProjects from "./project/MyRecentProjects";

const Home: React.FC = () => {
  return (
    <Box>
      <MyRecentProjects />
      <CreateVocabularyProject />
    </Box>
  );
};

export default Home;
