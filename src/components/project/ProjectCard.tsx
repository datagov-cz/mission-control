import React from "react";
import { ProjectData } from "../../@types";
import { getLastEditedProject } from "../../api/ProjectAPI";
import { Box, Button, styled, Typography } from "@mui/material";
import LastEdited from "./LastEdited";
import { UserProfile } from "../user/UserProfiles";

interface ProjectCardProps {
  project: ProjectData;
}

const ExpandingBox = styled(Box)(({ theme }) => ({
  color: "white",
  background: "#1E87AF",
  transition: "all .5s",
  borderRadius: "4px",
  overflow: "hidden",
  maxWidth: "400px",
  "& .hiddenBut": {
    maxHeight: 0,
    transition: "max-height .5s",
    overflow: "hidden",
  },
  "& .projectLabel":{
    "--fontsize": "1.25rem",
    position: "relative",
    maxHeight: `calc((${theme.typography.h6.lineHeight} * ${theme.typography.h6.fontSize}) )`,
    transition: "max-height .5s",
    overflow: "hidden",
    paddingRight: "1.6rem" /* space for ellipsis */,
    "&::before": {
      position: "absolute",
      content: '"\\002026"',
      bottom: 0,
      right: 0,
    },
    "&::after": {
      content: '""',
      position: "absolute",
      right: 0,
      width: "1.7rem",
      height: "2.1rem",
      background: "#1E87AF",
    },
  },
  "&:hover": {
    maxWidth: "600px",
    "& .hiddenBut": {
      maxHeight:"50px",
    },
    "& .projectLabel": {
      maxHeight: `calc((${theme.typography.h6.lineHeight} * ${theme.typography.h6.fontSize} * 3) )`,
    },
  },
}));

const ProjectCardExpandable: React.FC<ProjectCardProps> = ({ project }) => {
  //TODO: Make the sizing better, in a more calculated manner
  return (
    <ExpandingBox p={2}>
      <Typography variant={"h6"} className={"projectLabel"}>{project.label}</Typography>
      <Box mt={1}>
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
      <Box className={"hiddenBut"}>
        <Button sx={{marginBottom:"8px"}} variant={"contained"}>
          Hidden
        </Button>
      </Box>
    </ExpandingBox>
  );
};

export const LastEditProject: React.FC = () => {
  const data = getLastEditedProject();
  return <ProjectCardExpandable project={data} />;
};

export default ProjectCardExpandable;
