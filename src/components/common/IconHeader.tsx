import React from "react";
import { Box, Typography } from "@mui/material";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import t from "../i18n";

interface IconHeaderProps{
  icon: React.ReactNode;
  label: React.ReactNode;
}

const IconHeader:React.FC<IconHeaderProps> = ({icon, label}) => {
  return (
      <Box sx={{ display: "flex" }}>
        {icon}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant={"h5"}
            mb={1}
            mr={2}
          >{label}</Typography>
        </Box>
      </Box>
  );
};

export default IconHeader;
