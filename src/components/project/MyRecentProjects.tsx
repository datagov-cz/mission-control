import React, { useMemo } from "react";
import { useProjects } from "../../api/ProjectAPI";
import { useAuth } from "@opendata-mvcr/assembly-line-shared";
import ProjectCardExpandable from "./ProjectCard";
import { Box, Typography } from "@mui/material";
import t from "../i18n";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import { CenteredSpacedOutBox } from "../common/CenteredSpacedOutBox";
import SimpleBackdrop from "../common/SimpleBackdrop";
import CreateVocabulary from "../vocabulary/CreateVocabulary";

const MAX_NUMBER_OF_PROJECTS = 2;

const MyRecentProjects: React.FC = () => {
  const { data = [], isLoading } = useProjects();
  const {
    user: {
      profile: { sub },
    },
  } = useAuth();

  const myProjects = useMemo(() => {
    return data
      .filter((item) => {
        return item.lastEditor!.id === sub;
      })
      .slice(0, MAX_NUMBER_OF_PROJECTS);
  }, [data, sub]);

  if (isLoading) return <SimpleBackdrop show={true}/>
  if (myProjects.length === 0) return <></>;

  return (
    <>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <AutoGraphIcon fontSize={"large"} sx={{ marginRight: 1 }} />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant={"h5"} mb={1}>{t`myRecentProjects`}</Typography>
        </Box>
      </Box>
      <Box mt={1} display={"flex"} flex={1} sx={{ minHeight: 300 }}>
        {myProjects.map((project, index) => (
          <Box mr={index % 2 === 0 ? 2 : 0}>
            <ProjectCardExpandable project={project} />
          </Box>
        ))}
      </Box>
    </>
  );
};

export default MyRecentProjects;
