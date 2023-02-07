import React, { useContext, useState } from "react";
import { useProjectViaID } from "../../api/ProjectAPI";
import { ProjectData } from "../../@types";
import { useLocation, useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import t, { Namespace } from "../i18n";
import { CenteredSpacedOutBox } from "../common/CenteredSpacedOutBox";
import { calculateTimeDifference } from "../../utils/TimeUtils";
import LanguageContext from "../../LanguageContext";
import EditTermsButton from "./buttons/EditTermsButton";
import EditRelationsButton from "./buttons/EditRelationsButton";
import PublishButton from "./buttons/PublishButton";
import ProjectVocabularyListItem from "../vocabulary/ProjectVocabularyListItem";
import ProjectActions from "./ProjectActions";
import { ActionButton } from "../common/ActionButton";

export interface ProjectDetailProps {
  project: ProjectData;
}

const Project: React.FC = () => {
  let location = useLocation();
  if (location.state?.project) {
    return <ProjectDetail project={location.state.project} />;
  }
  return <ProjectDetailFetch />;
};

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
        Upravuje
      </Typography>
      {project.vocabularyContexts.map((vocabulary) => (
        <ProjectVocabularyListItem
          vocabulary={vocabulary}
          key={vocabulary.uri}
        />
      ))}
      <ActionButton
        fullWidth={true}
        onClick={() => setShowVocabualaries(!showVocabularies)}
      >
        Přidat slovník
      </ActionButton>
      {showVocabularies && <div>Vocabularies visible</div>}
    </Namespace.Provider>
  );
};

const ProjectDetailFetch: React.FC = () => {
  let params = useParams();
  const id = params["*"] ?? "";
  const { data, isLoading, isSuccess } = useProjectViaID(id);
  if (isLoading) return <Typography variant={"h4"}>{t`loading`}</Typography>;
  if (!isSuccess) return <h2>It went wrong</h2>;
  return <ProjectDetail project={data} />;
};

export default Project;
