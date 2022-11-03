import React from "react";
import { CenteredSpacedOutBox } from "../common/CenteredSpacedOutBox";
import { Box, Typography } from "@mui/material";
import t from "../i18n";

const ProjectListHeader: React.FC = () => {
  return (
    <>
      <CenteredSpacedOutBox>
        <Box flex={2}>
          <Typography
            variant={"subtitle1"}
            color={"gray"}
          >{t`label`}</Typography>
        </Box>
        <Box flex={3}>
          <Typography
            variant={"subtitle1"}
            color={"gray"}
          >{t`lastModified`}</Typography>
        </Box>
      </CenteredSpacedOutBox>
      <hr />
    </>
  );
};

export default ProjectListHeader;
