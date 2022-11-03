import React, { useContext } from "react";
import { useProjectViaID } from "../../api/ProjectAPI";
import {
  ProjectData as IProject,
  VocabularyData as IVocabulary,
} from "../../@types";
import { useLocation, useParams } from "react-router-dom";
import { Box, Button, styled, Typography } from "@mui/material";
import t, { Namespace } from "../i18n";
import DeleteIcon from "@mui/icons-material/Delete";
import { CenteredSpacedOutBox } from "../common/CenteredSpacedOutBox";
import LineBoxWrapper from "../common/LineBoxWrapper";
import { calculateTimeDifference } from "../../utils/TimeUtils";
import LanguageContext from "../../LanguageContext";

interface ProjectDetailInterface {
  project: IProject;
}

const Project: React.FC = () => {
  let location = useLocation();
  if (location.state?.project) {
    return <ProjectDetail project={location.state.project} />;
  }
  return <ProjectDetailFetch />;
};

const ActionButton = styled(Button)(() => ({
  color: "white",
  background: "linear-gradient(90deg, #2C397E, 10.42%, #1B96B9 100%)",
  "&:hover": {
    color: "white",
    background: "linear-gradient(90deg, #2C397E, 10.42%, #1B96B9 100%)",
  },
}));

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
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          color={"error"}
          sx={{ backgroundColor: "white" }}
        >
          <Typography variant={"subtitle2"}>{t`removeVocabulary`}</Typography>
        </Button>
      </CenteredSpacedOutBox>
    </LineBoxWrapper>
  );
};

//TODO: Make this component more readable
const ProjectDetail: React.FC<ProjectDetailInterface> = ({ project }) => {
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
      <CenteredSpacedOutBox width={500}>
        <Box flex={1}>
          <ActionButton variant="contained">
            <Typography variant={"subtitle2"}>{t`editTerms`}</Typography>
          </ActionButton>
        </Box>
        <Box flex={1}>
          <ActionButton
            variant="contained"
            onClick={() => console.log("Edit relations")}
          >
            <Typography variant={"subtitle2"}>{t`editRelations`}</Typography>
          </ActionButton>
        </Box>
        <Box flex={1}>
          <ActionButton
            variant="contained"
            onClick={() => console.log("Edit relations")}
          >
            <Typography variant={"subtitle2"}>{t`publish`}</Typography>
          </ActionButton>
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
