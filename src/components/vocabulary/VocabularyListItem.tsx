import React from "react";
import { Box, Typography } from "@mui/material";
import { CenteredSpacedOutBox } from "../common/CenteredSpacedOutBox";
import LineBoxWrapper from "../common/LineBoxWrapper";
import { BaseVocabularyData } from "../../@types";
import { ActionButton } from "../common/ActionButton";
import t from "../i18n";
import EditIcon from "@mui/icons-material/Edit";
interface Props {
  vocabulary: BaseVocabularyData;
  isWating: boolean;
  performAction: (vocabulary: BaseVocabularyData) => Promise<void>;
}

const VocabularyListItem: React.FC<Props> = ({
  vocabulary,
  isWating,
  performAction,
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
          <Typography variant={"subtitle2"}>{t`editVocabulary`}</Typography>
        </ActionButton>
      </CenteredSpacedOutBox>
    </LineBoxWrapper>
  );
};

export default VocabularyListItem;
