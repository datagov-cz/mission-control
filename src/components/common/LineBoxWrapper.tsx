import React from "react";
import { Box } from "@mui/material";

interface Props {
  children: React.ReactNode;
}

const LineBoxWrapper: React.FC<Props> = ({ children }) => {
  return (
    <Box
      px={2}
      py={1}
      sx={{
        background: "#1E87AF",
        borderRadius: "4px",
        marginTop: 1,
      }}
    >
      {children}
    </Box>
  );
};
export default LineBoxWrapper;
