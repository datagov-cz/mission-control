import React from "react";
import { Box, Typography } from "@mui/material";

const LineBoxWrapper: React.FC = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(90deg, #2C397E, 10.42%, #1B96B9 100%)",
        width: 300,
      }}
    >
      <Typography variant={"h5"}>Hello there</Typography>
    </Box>
  );
};
export default LineBoxWrapper;
