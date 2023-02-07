import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BaseVocabularyData, ProjectData } from "../../@types";
import { notifyPromise } from "../common/Notify";
import Vocabularies from "./Vocabularies";
import { addVocabularyToExistingProject, useVocabularies } from "../../api/VocabularyApi";
import t, { Namespace } from "../i18n";
import { Typography } from "@mui/material";

interface AddVocabularyToProjectProps {
  project: ProjectData;
}

const AddVocabularyToProject: React.FC<AddVocabularyToProjectProps> = ({
  project,
}) => {
  let navigate = useNavigate();
  const [isWaiting, setIsWaiting] = useState(false);
  const { data = [], isLoading } = useVocabularies();
  const availableVocabularies = useMemo(() => {
    return data.filter((vocabulary) => {
      for (const vocabularyContext of project.vocabularyContexts) {
        if(vocabulary.basedOnVersion === vocabularyContext.basedOnVersion){
          return false
        }
      }
      return true
    })
  }, [data, project.vocabularyContexts]);

  const addVocabularyToProject = async (vocabulary: BaseVocabularyData) => {
    setIsWaiting(true);
    notifyPromise(addVocabularyToExistingProject(vocabulary, project))
      .then((instanceID) => {
        setIsWaiting(false)
        navigate(`/projects/${instanceID}`,{});
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
