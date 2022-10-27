import React, { Dispatch, SetStateAction } from "react";
import { Box, Button, Typography } from "@mui/material";
import { CenteredSpacedOutBox } from "../common/CenteredSpacedOutBox";
import LineBoxWrapper from "../common/LineBoxWrapper";
import { BaseVocabularyData } from "../../@types";
import { createVocabularyProjectPromise } from "../../api/ProjectAPI";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  vocabulary: BaseVocabularyData;
  setIsWaiting: Dispatch<SetStateAction<boolean>>;
}

const VocabularyListItem: React.FC<Props> = ({
                                               vocabulary, setIsWaiting
                                             }) => {
  let navigate = useNavigate();
  const queryClient = useQueryClient();

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
        <Button onClick={() => createProject(vocabulary)}>SEND REQUEST</Button>
      </CenteredSpacedOutBox>
    </LineBoxWrapper>
  );
};

export default VocabularyListItem;