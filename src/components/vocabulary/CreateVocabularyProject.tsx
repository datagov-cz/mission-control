import React, { useCallback, useState } from "react";
import { useIntl } from "react-intl";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ToastPromiseParams } from "react-toastify";
import { AddVocabularyPayload, BaseVocabularyData } from "../../@types";
import { notifyPromise } from "../common/Notify";
import { createVocabularyProjectPromise } from "../../api/ProjectAPI";
import Vocabularies from "./Vocabularies";
import { createVocabulary, useVocabularies } from "../../api/VocabularyApi";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import t from "../i18n";
import SimpleBackdrop from "../common/SimpleBackdrop";
import { Box } from "@mui/material";
import CreateVocabulary from "./CreateVocabulary";
import IconHeader from "../common/IconHeader";

const CreateVocabularyProject: React.FC = () => {
  const intl = useIntl();
  const queryClient = useQueryClient();
  let navigate = useNavigate();
  const [isWaiting, setIsWaiting] = useState(false);
  const formatProjectCreationMessage = (label: string): ToastPromiseParams => {
    const pending = `${intl.messages["common.creatingProject"]} ${label}`;
    const success = `${label} ${intl.messages["common.projectSuccessCreation"]} 🎉`;
    const error = `${intl.messages["common.somethingWentWrong"]}`;

    return {
      pending: pending,
      success: success,
      error: error,
    };
  };

  const formatVocabularyCreationMessage = (): ToastPromiseParams => {
    const pending = `${intl.messages["vocabularies.creatingVocabulary"]} `;
    const success = `${intl.messages["vocabularies.created"]} 🎉`;
    const error = `${intl.messages["common.somethingWentWrong"]}`;

    return {
      pending: pending,
      success: success,
      error: error,
    };
  };

  const onVocabularyCreationSubmit = useCallback(
    (payload: AddVocabularyPayload) => {
      notifyPromise(
        createVocabulary(payload),
        formatVocabularyCreationMessage()
      ).then((projectID) => {
        queryClient.invalidateQueries(["projects"]);
        queryClient.invalidateQueries(["vocabularies"]);
        navigate(`/projects/${projectID}`);
      });
    },
    [navigate, queryClient]
  );
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

  const { data = [], isLoading } = useVocabularies();

  if (isLoading) return <SimpleBackdrop show={true} />;
  return (
    <>
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
          <CreateVocabulary submitAction={onVocabularyCreationSubmit} />
        </Box>
      </Box>
      <Vocabularies
        performAction={createProject}
        isWaiting={isWaiting}
        data={data}
      />
    </>
  );
};

export default CreateVocabularyProject;
