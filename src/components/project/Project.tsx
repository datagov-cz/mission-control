import React, { useContext, useState } from "react";
import { useProjectViaID } from "../../api/ProjectAPI";
import { ProjectData } from "../../@types";
import { useParams } from "react-router-dom";
import { Box, IconButton, Typography } from "@mui/material";
import t, { Namespace } from "../i18n";
import { calculateTimeDifference } from "../../utils/TimeUtils";
import LanguageContext from "../../LanguageContext";
import ProjectVocabularyListItem from "../vocabulary/ProjectVocabularyListItem";
import ProjectActions from "./ProjectActions";
import { ActionButton } from "../common/ActionButton";
import AddVocabularyToProject from "../vocabulary/AddVocabularyToProject";
import SimpleBackdrop from "../common/SimpleBackdrop";
import { UserProfile } from "../user/UserProfiles";
import RenameProjectForm from "./RenameProjectForm";
import useToggle from "../../hooks/useToggle";
import EditIcon from "@mui/icons-material/Edit";

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
  const edit = useToggle();

  const [showVocabularies, setShowVocabualaries] = useState(false);
  const [disableActions, setDisableActions] = useState(false);

  const { language } = useContext(LanguageContext);
  const { formattedText } = calculateTimeDifference(
    project.lastModified!,
    language
  );

  return (
    <Namespace.Provider value={"workspaces"}>
      <Box display={"flex"} sx={{ alignItems: "center" }}>
        <Typography variant="h4" mt={2} mb={2}>
          {project.label}
        </Typography>
        <Box>
          <IconButton onClick={() => edit.open()}>
            <EditIcon />
          </IconButton>
        </Box>
      </Box>
      <Box display={"flex"}>
        <Box mr={1}>
          <UserProfile user={project.lastEditor} />
        </Box>
        <Typography variant={"subtitle1"}>
          {`${project.lastEditor?.firstName} ${project.lastEditor?.lastName}`}
        </Typography>
      </Box>

      <Typography variant={"subtitle1"} mb={2}>
        {t`lastModified`} {` ${formattedText}`}
      </Typography>
      <ProjectActions project={project} disable={disableActions} />
      <Typography variant="h5" mt={2} mb={2}>
        {t`edits`}
      </Typography>
      {project.vocabularyContexts.map((vocabulary) => (
        <ProjectVocabularyListItem
          isBusy={disableActions}
          setBusy={setDisableActions}
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
        {showVocabularies ? t`hideAddVocabularyButton` : t`addVocabulary`}
      </ActionButton>
      {showVocabularies && (
        <AddVocabularyToProject
          project={project}
          setBusy={setDisableActions}
          isBusy={disableActions}
        />
      )}
      <RenameProjectForm
        project={project}
        isOpen={edit.isOpen}
        onClose={edit.close}
      />
    </Namespace.Provider>
  );
};

export default Project;
