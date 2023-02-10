import React from "react";
import { ProjectData, Vocabulary, VocabularyData } from "../../@types";
import LineBoxWrapper from "../common/LineBoxWrapper";
import { CenteredSpacedOutBox } from "../common/CenteredSpacedOutBox";
import { Box, Typography } from "@mui/material";
import RemoveVocabularyButton from "../project/buttons/RemoveVocabulary";
import {
  publishProjectPromise,
  removeVocabularyFromProjectPromise,
} from "../../api/ProjectAPI";
import { notifyPromise } from "../common/Notify";
import { useNavigate } from "react-router-dom";

export interface VocabularyProps {
  vocabulary: VocabularyData;
  project: ProjectData;
}

const ProjectVocabularyListItem: React.FC<VocabularyProps> = ({
  vocabulary,
  project,
}) => {
  let navigate = useNavigate();

  const onClickHandler = () => {
    notifyPromise(removeVocabularyFromProjectPromise(project, vocabulary)).then(()=>navigate(0))
  };

  return (
    <LineBoxWrapper>
      <CenteredSpacedOutBox>
        <Box flex={2}>
          <Typography variant={"body1"} color={"white"}>
            {vocabulary.label}
          </Typography>
        </Box>
        <RemoveVocabularyButton onClick={onClickHandler} />
      </CenteredSpacedOutBox>
    </LineBoxWrapper>
  );
};

export default ProjectVocabularyListItem;
