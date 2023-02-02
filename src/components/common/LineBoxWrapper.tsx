import React from "react";
import { Box } from "@mui/material";
import { LINEAR_BACKGROUND } from "../../utils/Constants";

interface Props {
  children: React.ReactNode;
}

const LineBoxWrapper: React.FC<Props> = ({ children }) => {
  return (
    <Box
      sx={{
        background: "#1E87AF",
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
