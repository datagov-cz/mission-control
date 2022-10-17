import React from "react";
import { useProjects } from "../api/ProjectAPI";
import { Link } from "react-router-dom";
import getIdFromIri from "../utils/getIdFromIri";

const Projects: React.FC = () => {
  //TODO: Maybe check if the project object was received or the url
  const { data = [], isLoading } = useProjects();
  if (isLoading) return <h2>Loading...</h2>;
  return (
    <div>
      <h2>Projects</h2>
      <nav>
        <ul>
          {data.map((project) => (
            <li>
              <Link to={getIdFromIri(project.uri)} state={{ project }}>
                {project.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Projects;
