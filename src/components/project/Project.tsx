import React, { useContext } from "react";
import { useProjectViaID } from "../../api/ProjectAPI";
import { ProjectData, VocabularyData as IVocabulary } from "../../@types";
import { useLocation, useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import t, { Namespace } from "../i18n";
import { CenteredSpacedOutBox } from "../common/CenteredSpacedOutBox";
import LineBoxWrapper from "../common/LineBoxWrapper";
import { calculateTimeDifference } from "../../utils/TimeUtils";
import LanguageContext from "../../LanguageContext";
import RemoveVocabularyButton from "./buttons/RemoveVocabulary";
import EditTermsButton from "./buttons/EditTermsButton";
import EditRelationsButton from "./buttons/EditRelationsButton";
import PublishButton from "./buttons/PublishButton";

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

interface VocabularyI {
  vocabulary: IVocabulary;
}

//TODO: Create vocabulary component with customizable button

const Vocabulary: React.FC<VocabularyI> = ({ vocabulary }) => {
  return (
    <LineBoxWrapper>
      <CenteredSpacedOutBox>
        <Box flex={2}>
          <Typography variant={"body1"} color={"white"}>
            {vocabulary.label}
          </Typography>
        </Box>
        <RemoveVocabularyButton />
      </CenteredSpacedOutBox>
    </LineBoxWrapper>
  );
};

//TODO: Make this component more readable
const ProjectDetail: React.FC<ProjectDetailProps> = ({ project }) => {
  //TODO: Make it work with the previous calculation
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
      <CenteredSpacedOutBox width={700}>
        <Box flex={1}>
          <EditTermsButton project={project} />
        </Box>
        <Box flex={1}>
          <EditRelationsButton project={project} />
        </Box>
        <Box flex={1}>
          <PublishButton project={project} />
        </Box>
      </CenteredSpacedOutBox>
      <Typography variant="h5" mt={2} mb={2}>
        Upravuje
      </Typography>
      {project.vocabularyContexts.map((vocabulary) => (
        <Vocabulary vocabulary={vocabulary} key={vocabulary.uri} />
      ))}
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
