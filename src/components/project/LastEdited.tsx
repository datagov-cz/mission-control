import React, { useContext } from "react";
import { calculateTimeDifference } from "../../utils/TimeUtils";
import LanguageContext from "../../LanguageContext";
import { Box, Typography } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { CenteredSpacedOutBox } from "../common/CenteredSpacedOutBox";

interface LastEditedProps {
  lastModified: Date;
}

const LastEdited: React.FC<LastEditedProps> = ({ lastModified }) => {
  const { language } = useContext(LanguageContext);
  const calculatedDifference = calculateTimeDifference(lastModified, language);

  return (
    <CenteredSpacedOutBox>
      <Box display={"flex"}>
        {calculatedDifference.showWarning && (
          <WarningAmberIcon sx={{ color: "#FFC12C", marginRight: "8px" }} />
        )}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant={"body2"}
            color={calculatedDifference.showWarning ? "#FFC12C" : "inherit"}
          >
            {calculatedDifference.formattedText}
          </Typography>
        </Box>
      </Box>
    </CenteredSpacedOutBox>
  );
};
export default LastEdited;
