import React, { useMemo, useState } from "react";
import { BaseVocabularyData, ProjectData } from "../../@types";
import { notifyPromise } from "../common/Notify";
import Vocabularies from "./Vocabularies";
import {
  addVocabularyToExistingProject,
  useVocabularies,
} from "../../api/VocabularyApi";
import t, { Namespace } from "../i18n";
import { Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { ToastPromiseParams } from "react-toastify";
import { useIntl } from "react-intl";

interface AddVocabularyToProjectProps {
  project: ProjectData;
}

const AddVocabularyToProject: React.FC<AddVocabularyToProjectProps> = ({
  project,
}) => {
  const queryClient = useQueryClient();
  const [isWaiting, setIsWaiting] = useState(false);
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
    setIsWaiting(true);
    notifyPromise(
      addVocabularyToExistingProject(vocabulary, project),
      formatProjectCreationMessage()
    )
      .then((instanceID) => {
        setIsWaiting(false);
        queryClient.invalidateQueries(["projectsID", instanceID]);
      })
      .catch(() => setIsWaiting(false));
  };

  if (isLoading) return <Typography variant={"h4"}>{t`loading`}</Typography>;
  return (
    <Namespace.Provider value={"common"}>
      <Vocabularies
        performAction={addVocabularyToProject}
        isWaiting={isWaiting}
        data={availableVocabularies}
      />
    </Namespace.Provider>
  );
};

export default AddVocabularyToProject;
