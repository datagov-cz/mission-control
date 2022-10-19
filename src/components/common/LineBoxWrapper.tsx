import React from "react";
import { Box } from "@mui/material";

interface Props {
  children: React.ReactNode;
}

const LineBoxWrapper: React.FC<Props> = ({ children }) => {
  return (
    <Box
      sx={{
        background: "linear-gradient(90deg, #2C397E, 10.42%, #1B96B9 100%)",
        padding: 1,
        borderRadius: "4px",
        marginTop: 1,
      }}
    >
      {children}
    </Box>
  );
};
export default LineBoxWrapper;
