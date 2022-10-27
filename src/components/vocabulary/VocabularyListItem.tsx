import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { CenteredSpacedOutBox } from "../common/CenteredSpacedOutBox";
import LineBoxWrapper from "../common/LineBoxWrapper";
import { BaseVocabularyData } from "../../@types";
import { createVocabularyProject } from "../../api/ProjectAPI";

interface Props {
  vocabulary: BaseVocabularyData;
}

const VocabularyListItem: React.FC<Props> = ({
                                               vocabulary
                                             }) => {


  return (
    <LineBoxWrapper>
      <CenteredSpacedOutBox>
        <Box flex={2}>
          <Typography variant={"body1"} color={"white"}>
            {vocabulary.label}
          </Typography>
        </Box>
        <Button onClick={() => createVocabularyProject(vocabulary)}>SEND REQUEST</Button>
      </CenteredSpacedOutBox>
    </LineBoxWrapper>
  );
};

export default VocabularyListItem;