import React, { useContext, useState } from "react";
import { useProjectViaID } from "../../api/ProjectAPI";
import { ProjectData } from "../../@types";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import t, { Namespace } from "../i18n";
import { calculateTimeDifference } from "../../utils/TimeUtils";
import LanguageContext from "../../LanguageContext";
import ProjectVocabularyListItem from "../vocabulary/ProjectVocabularyListItem";
import ProjectActions from "./ProjectActions";
import { ActionButton } from "../common/ActionButton";
import AddVocabularyToProject from "../vocabulary/AddVocabularyToProject";
import SimpleBackdrop from "../common/SimpleBackdrop";

export interface ProjectDetailProps {
  project: ProjectData;
}

const Project: React.FC = () => {
  let params = useParams();
  const id = params["*"] ?? "";
  const { data, isLoading, isSuccess } = useProjectViaID(id);
  if (isLoading) return <SimpleBackdrop show={true} />;
  if (!isSuccess) return <h2>It went wrong</h2>;
  return <ProjectDetail project={data} />;
};

//TODO: show the vocabularies by lazy loading

//TODO: Make this component more readable
const ProjectDetail: React.FC<ProjectDetailProps> = ({ project }) => {
  const [showVocabularies, setShowVocabualaries] = useState(false);
  const { language } = useContext(LanguageContext);
  const { formattedText } = calculateTimeDifference(
    project.lastModified!,
    language
  );
  return (
    <Namespace.Provider value={"workspaces"}>
      <Typography variant="h4" mt={2} mb={2}>
        {project.label}
      </Typography>
      <Typography variant={"subtitle1"} mt={2} mb={2}>
        {t`lastModified`} {` ${formattedText}`}
      </Typography>
      <ProjectActions project={project} />
      <Typography variant="h5" mt={2} mb={2}>
        {t`edits`}
      </Typography>
      {project.vocabularyContexts.map((vocabulary) => (
        <ProjectVocabularyListItem
          vocabulary={vocabulary}
          key={vocabulary.uri}
          project={project}
        />
      ))}
      <ActionButton
        sx={{ marginTop: 2, marginBottom: 2 }}
        fullWidth={true}
        onClick={() => setShowVocabualaries(!showVocabularies)}
      >
        {showVocabularies? t`hideAddVocabularyButton` : t`addVocabulary`}
      </ActionButton>
      {showVocabularies && <AddVocabularyToProject project={project} />}
    </Namespace.Provider>
  );
};

export default Project;
