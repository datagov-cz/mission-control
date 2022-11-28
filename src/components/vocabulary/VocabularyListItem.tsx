import React, { Dispatch, SetStateAction } from "react";
import { Box, Typography } from "@mui/material";
import { CenteredSpacedOutBox } from "../common/CenteredSpacedOutBox";
import LineBoxWrapper from "../common/LineBoxWrapper";
import { BaseVocabularyData } from "../../@types";
import { createVocabularyProjectPromise } from "../../api/ProjectAPI";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { ActionButtonWhite } from "../common/ActionButton";
import { notifyPromise } from "../common/Notify";
import t from "../i18n";
import { useIntl } from "react-intl";
import { ToastPromiseParams } from "react-toastify";

interface Props {
  vocabulary: BaseVocabularyData;
  setIsWaiting: Dispatch<SetStateAction<boolean>>;
  isWating: boolean;
}

const VocabularyListItem: React.FC<Props> = ({
  vocabulary,
  setIsWaiting,
  isWating,
}) => {
  let navigate = useNavigate();
  const queryClient = useQueryClient();
  const intl = useIntl();

  const formatProjectCreationMessage = (): ToastPromiseParams => {
    //TODO: find a way to do it via some utility
    //TODO: find a way to make it a styled component, not only text
    const pending = `${intl.messages["common.creatingProject"]} ${vocabulary.label}`;
    const success = `${vocabulary.label} ${intl.messages["common.projectSuccessCreation"]} 🎉`;
    const error = `${intl.messages["common.somethingWentWrong"]}`;

    return {
      pending: pending,
      success: success,
      error: error,
    };
  };

  const createProject = async (vocabulary: BaseVocabularyData) => {
    setIsWaiting(true);
    notifyPromise(
      createVocabularyProjectPromise(vocabulary),
      formatProjectCreationMessage()
    )
      .then((instanceID) => {
        queryClient.invalidateQueries(["projects"]);
        navigate(`/projects/${instanceID}`);
      })
      .catch(() => setIsWaiting(false));
  };
  return (
    <LineBoxWrapper>
      <CenteredSpacedOutBox>
        <Box flex={2}>
          <Typography variant={"body1"} color={"white"}>
            {vocabulary.label}
          </Typography>
        </Box>
        <ActionButtonWhite
          disabled={isWating}
          onClick={() => createProject(vocabulary)}
        >
          <Typography variant={"subtitle2"}>{t`editVocabulary`}</Typography>
        </ActionButtonWhite>
      </CenteredSpacedOutBox>
    </LineBoxWrapper>
  );
};

export default VocabularyListItem;
