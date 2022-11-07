import React from "react";
import { ProjectData } from "../../@types";
import { getLastEditedProject } from "../../api/ProjectAPI";
import { Box, Button, styled, Typography } from "@mui/material";
import LastEdited from "./LastEdited";
import { UserProfile } from "../user/UserProfiles";

interface ProjectCardProps {
  project: ProjectData;
}

const ExpandingBox = styled(Box)(() => ({
  color: "white",
  background: "linear-gradient(90deg, #2C397E, 10.42%, #1B96B9 100%)",
  transition: "all 0.3s",
  width: 300,
  height: 100,
  borderRadius: "4px",
  overflow: "hidden",
  "& .hiddenBut": {
    display: "none",
  },
  "&:hover": {
    width: 500,
    height: 200,
    "& .hiddenBut": {
      display: "block",
    },
  },
}));

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  //TODO: Make the sizing better, in a more calculated manner
  return (
    <ExpandingBox p={2}>
      <Typography variant={"h6"}>{project.label}</Typography>
      <Box
        mt={1}
        sx={{
          height: "100px",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Typography mr={1} variant={"subtitle1"}>
            Poslední úprava:
          </Typography>
          <Box>
            <Box display={"flex"}>
              <Box mr={1} height={"100%"}>
                <UserProfile user={project.lastEditor} />
              </Box>
              <Box>
                <Typography variant={"subtitle1"}>
                  {`${project.lastEditor?.firstName} ${project.lastEditor?.lastName}`}
                </Typography>
                <LastEdited lastModified={project.lastModified!} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        <Button className={"hiddenBut"} variant={"contained"}>
          Hidden
        </Button>
      </Box>
    </ExpandingBox>
  );
};

export const LastEditProject: React.FC = () => {
  const data = getLastEditedProject();
  return <ProjectCard project={data} />;
};

export default ProjectCard;
