import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BaseVocabularyData, ProjectData } from "../../@types";
import { notifyPromise } from "../common/Notify";
import Vocabularies from "./Vocabularies";
import { addVocabularyToExistingProject } from "../../api/VocabularyApi";
import { Namespace } from "../i18n";

interface AddVocabularyToProjectProps {
  project: ProjectData;
}

const AddVocabularyToProject: React.FC<AddVocabularyToProjectProps> = ({
  project,
}) => {
  let navigate = useNavigate();
  const [isWaiting, setIsWaiting] = useState(false);

  const addVocabularyToProject = async (vocabulary: BaseVocabularyData) => {
    setIsWaiting(true);
    notifyPromise(addVocabularyToExistingProject(vocabulary, project))
      .then((instanceID) => {
        setIsWaiting(false)
        navigate(`/projects/${instanceID}`,{});
      })
      .catch(() => setIsWaiting(false));
  };
  return (
    <Namespace.Provider value={"common"}>
      <Vocabularies
        performAction={addVocabularyToProject}
        isWaiting={isWaiting}
      />
    </Namespace.Provider>
  );
};

export default AddVocabularyToProject;
