import React from "react";
import { Box, Typography } from "@mui/material";
import { CenteredSpacedOutBox } from "../common/CenteredSpacedOutBox";
import LineBoxWrapper from "../common/LineBoxWrapper";
import { BaseVocabularyData } from "../../@types";
import { ActionButton } from "../common/ActionButton";
import EditIcon from "@mui/icons-material/Edit";
interface Props {
  vocabulary: BaseVocabularyData;
  isWating: boolean;
  performAction: (vocabulary: BaseVocabularyData) => Promise<void>;
  labelAction: React.ReactNode;
}

const VocabularyListItem: React.FC<Props> = ({
  vocabulary,
  isWating,
  performAction,
  labelAction,
}) => {
  return (
    <LineBoxWrapper>
      <CenteredSpacedOutBox>
        <Box flex={2} pr={2}>
          <Typography variant={"body1"} color={"white"}>
            {vocabulary.label}
          </Typography>
        </Box>
        <ActionButton
          endIcon={<EditIcon />}
          textColor={"black"}
          backgroundColor={"white"}
          disabled={isWating}
          onClick={() => performAction(vocabulary)}
        >
          {labelAction}
        </ActionButton>
      </CenteredSpacedOutBox>
    </LineBoxWrapper>
  );
};

export default VocabularyListItem;
