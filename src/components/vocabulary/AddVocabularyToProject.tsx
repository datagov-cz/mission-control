import React, { useMemo } from "react";
import {
  AddVocabularyPayload,
  BaseVocabularyData,
  ProjectData,
} from "../../@types";
import { notifyPromise } from "../common/Notify";
import Vocabularies from "./Vocabularies";
import {
  addVocabularyToExistingProject,
  createVocabularyToExistingProject,
  useVocabularies,
} from "../../api/VocabularyApi";
import t, { Namespace } from "../i18n";
import { Box, Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { ToastPromiseParams } from "react-toastify";
import { useIntl } from "react-intl";
import CreateVocabulary from "./CreateVocabulary";
import IconHeader from "../common/IconHeader";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";

interface AddVocabularyToProjectProps {
  project: ProjectData;
  setBusy: React.Dispatch<React.SetStateAction<boolean>>;
  isBusy: boolean;
}

const AddVocabularyToProject: React.FC<AddVocabularyToProjectProps> = ({
  project,
  setBusy,
  isBusy,
}) => {
  const queryClient = useQueryClient();
  const { data = [], isLoading } = useVocabularies();
  const intl = useIntl();
  const formatProjectCreationMessage = (): ToastPromiseParams => {
    const pending = `${intl.messages["workspaces.addingVocabulary"]} `;
    const success = `${intl.messages["workspaces.addVocabularySuccess"]} 🎉`;
    const error = `${intl.messages["common.somethingWentWrong"]}`;

    return {
      pending: pending,
      success: success,
      error: error,
    };
  };
  const availableVocabularies = useMemo(() => {
    return data.filter((vocabulary) => {
      for (const vocabularyContext of project.vocabularyContexts) {
        if (vocabulary.basedOnVersion === vocabularyContext.basedOnVersion) {
          return false;
        }
      }
      return true;
    });
  }, [data, project.vocabularyContexts]);

  const addVocabularyToProject = async (vocabulary: BaseVocabularyData) => {
    setBusy(true);
    notifyPromise(
      addVocabularyToExistingProject(vocabulary, project),
      formatProjectCreationMessage()
    )
      .then((instanceID) => {
        setBusy(false);
        queryClient.invalidateQueries(["projectsID", instanceID]);
      })
      .catch(() => {
        setBusy(false);
      });
  };

  const createVocabularyToProject = async (
    vocabulary: AddVocabularyPayload
  ) => {
    setBusy(true);
    notifyPromise(
      createVocabularyToExistingProject(vocabulary, project),
      formatProjectCreationMessage()
    )
      .then((instanceID) => {
        setBusy(false);
        queryClient.invalidateQueries(["projectsID", instanceID]);
      })
      .catch(() => setBusy(false));
  };

  if (isLoading) return <Typography variant={"h4"}>{t`loading`}</Typography>;
  return (
    <Namespace.Provider value={"common"}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <IconHeader
          icon={
            <AutoStoriesOutlinedIcon
              fontSize={"large"}
              sx={{ marginRight: 1 }}
            />
          }
          label={t`vocabularies`}
        />
        <Box>
          <CreateVocabulary submitAction={createVocabularyToProject} />
        </Box>
      </Box>

      <Vocabularies
        performAction={addVocabularyToProject}
        isWaiting={isBusy}
        data={availableVocabularies}
      />
    </Namespace.Provider>
  );
};

export default AddVocabularyToProject;
