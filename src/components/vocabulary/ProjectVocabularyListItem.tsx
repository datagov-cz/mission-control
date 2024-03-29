import React from "react";
import { ProjectData, VocabularyData } from "../../@types";
import LineBoxWrapper from "../common/LineBoxWrapper";
import { CenteredSpacedOutBox } from "../common/CenteredSpacedOutBox";
import { Box, Typography } from "@mui/material";
import RemoveVocabularyButton from "../project/buttons/RemoveVocabulary";
import { removeVocabularyFromProjectPromise } from "../../api/ProjectAPI";
import { notifyPromise } from "../common/Notify";
import { ToastPromiseParams } from "react-toastify";
import { useIntl } from "react-intl";
import { useQueryClient } from "@tanstack/react-query";
import getIdFromIri from "../../utils/getIdFromIri";

export interface VocabularyProps {
  vocabulary: VocabularyData;
  project: ProjectData;
  setBusy: React.Dispatch<React.SetStateAction<boolean>>;
  isBusy: boolean;
}

const ProjectVocabularyListItem: React.FC<VocabularyProps> = ({
  vocabulary,
  project,
  setBusy,
  isBusy,
}) => {
  const intl = useIntl();
  const queryClient = useQueryClient();
  const formatProjectCreationMessage = (): ToastPromiseParams => {
    const pending = `${intl.messages["workspaces.removingVocabulary"]} `;
    const success = `${intl.messages["workspaces.removeVocabularySucces"]} 🎉`;
    const error = `${intl.messages["common.somethingWentWrong"]}`;

    return {
      pending: pending,
      success: success,
      error: error,
    };
  };
  const onClickHandler = () => {
    setBusy(true);
    notifyPromise(
      removeVocabularyFromProjectPromise(project, vocabulary),
      formatProjectCreationMessage()
    )
      .then(() => {
        setBusy(false);
        queryClient.invalidateQueries([
          "projectsID",
          getIdFromIri(project.uri),
        ]);
        queryClient.invalidateQueries(["projects"]);
      })
      .catch(() => setBusy(false));
  };

  return (
    <LineBoxWrapper>
      <CenteredSpacedOutBox>
        <Box flex={2}>
          <Typography variant={"body1"} color={"white"}>
            {vocabulary.label}
          </Typography>
        </Box>
        <RemoveVocabularyButton onClick={onClickHandler} disabled={isBusy} />
      </CenteredSpacedOutBox>
    </LineBoxWrapper>
  );
};

export default ProjectVocabularyListItem;
