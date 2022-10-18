import React from "react";
import { useProjects } from "../api/ProjectAPI";
import { Link } from "react-router-dom";
import getIdFromIri from "../utils/getIdFromIri";
import { Box, Button, Container, styled, Typography } from "@mui/material";
import LineBoxWrapper from "./common/LineBoxWrapper";
import SettingsIcon from "@mui/icons-material/Settings";

const LinkToProject = styled(Link)(() => ({
  color: "white",
  textDecoration: "none",
  paddingRight: "16px"
}));


const Projects: React.FC = () => {
  const { data = [], isLoading } = useProjects();
  if (isLoading) return <h2>Loading...</h2>;
  return (
    <Container>
      <Typography variant={"h4"}>Projects</Typography>
      {data.map((project) => (
        <LineBoxWrapper>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Typography variant={"h6"} color={"white"}> {project.label}</Typography>
            <Button variant="contained" sx={{ padding: 0, color: "black", backgroundColor: "white" }}
                    startIcon={<SettingsIcon sx={{ marginLeft: "16px" }} />}>
              <LinkToProject to={getIdFromIri(project.uri)} state={{ project }}>
                <Typography variant={"h6"} color={"black"}> Spravovat</Typography>
              </LinkToProject>
            </Button>
          </Box>
        </LineBoxWrapper>
      ))}
    </Container>
  );
};

export default Projects;
