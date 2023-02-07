import React, { useState } from "react";
import { useIntl } from "react-intl";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ToastPromiseParams } from "react-toastify";
import { BaseVocabularyData } from "../../@types";
import { notifyPromise } from "../common/Notify";
import { createVocabularyProjectPromise } from "../../api/ProjectAPI";
import Vocabularies from "./Vocabularies";

const CreateVocabularyProject: React.FC = () => {
  const intl = useIntl();
  const queryClient = useQueryClient();
  let navigate = useNavigate();
  const [isWaiting, setIsWaiting] = useState(false);
  const formatProjectCreationMessage = (label: string): ToastPromiseParams => {
    //TODO: find a way to do it via some utility
    //TODO: find a way to make it a styled component, not only text
    const pending = `${intl.messages["common.creatingProject"]} ${label}`;
    const success = `${label} ${intl.messages["common.projectSuccessCreation"]} 🎉`;
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
      formatProjectCreationMessage(vocabulary.label)
    )
      .then((instanceID) => {
        queryClient.invalidateQueries(["projects"]);
        navigate(`/projects/${instanceID}`);
      })
      .catch(() => setIsWaiting(false));
  };
  return <Vocabularies performAction={createProject} isWaiting={isWaiting} />;
};

export default CreateVocabularyProject;