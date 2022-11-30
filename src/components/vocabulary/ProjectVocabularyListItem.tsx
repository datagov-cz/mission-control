import React from "react";
import { VocabularyData } from "../../@types";
import LineBoxWrapper from "../common/LineBoxWrapper";
import { CenteredSpacedOutBox } from "../common/CenteredSpacedOutBox";
import { Box, Typography } from "@mui/material";
import RemoveVocabularyButton from "../project/buttons/RemoveVocabulary";

export interface VocabularyProps {
  vocabulary: VocabularyData;
}

const ProjectVocabularyListItem: React.FC<VocabularyProps> = ({
  vocabulary,
}) => {
  return (
    <LineBoxWrapper>
      <CenteredSpacedOutBox>
        <Box flex={2}>
          <Typography variant={"body1"} color={"white"}>
            {vocabulary.label}
          </Typography>
        </Box>
        <RemoveVocabularyButton />
      </CenteredSpacedOutBox>
    </LineBoxWrapper>
  );
};

export default ProjectVocabularyListItem;