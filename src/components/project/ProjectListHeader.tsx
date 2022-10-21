import React from "react";
import { CenteredSpacedOutBox } from "../common/CenteredSpacedOutBox";
import { Box, Typography } from "@mui/material";

const ProjectListHeader: React.FC = () => {
  return (
    <>
      <CenteredSpacedOutBox>
        <Box flex={2}>
          <Typography variant={"subtitle1"} color={"gray"}>Název</Typography>
        </Box>
        <Box flex={3}>
          <Typography variant={"subtitle1"} color={"gray"}>Upraveno</Typography>
        </Box>
      </CenteredSpacedOutBox>
      <hr />
    </>
  );
};

export default ProjectListHeader;