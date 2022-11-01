import React, { Dispatch, SetStateAction } from "react";
import { Box, Button, Typography } from "@mui/material";
import { CenteredSpacedOutBox } from "../common/CenteredSpacedOutBox";
import LineBoxWrapper from "../common/LineBoxWrapper";
import { BaseVocabularyData } from "../../@types";
import { createVocabularyProjectPromise } from "../../api/ProjectAPI";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { ActionButton } from "../common/ActionButton";

interface Props {
  vocabulary: BaseVocabularyData;
  setIsWaiting: Dispatch<SetStateAction<boolean>>;
  isWating: boolean;
}

const VocabularyListItem: React.FC<Props> = ({
                                               vocabulary, setIsWaiting, isWating
                                             }) => {
  let navigate = useNavigate();
  const queryClient = useQueryClient();

  //TODO: use this package for the notifications https://fkhadra.github.io/react-toastify/introduction/
  const createProject = async (vocabulary: BaseVocabularyData) => {
    setIsWaiting(true);
    createVocabularyProjectPromise(vocabulary).then((instanceID) => {
        queryClient.invalidateQueries(["projects"]);
        navigate(`/projects/${instanceID}`);
      }
    ).catch(() => setIsWaiting(false));


  };
  return (
    <LineBoxWrapper>
      <CenteredSpacedOutBox>
        <Box flex={2}>
          <Typography variant={"body1"} color={"white"}>
            {vocabulary.label}
          </Typography>
        </Box>
        <ActionButton disabled={isWating} onClick={() => createProject(vocabulary)}>EDIT VOCABULARY</ActionButton>
      </CenteredSpacedOutBox>
    </LineBoxWrapper>
  );
};

export default VocabularyListItem;