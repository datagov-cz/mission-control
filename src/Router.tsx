import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./components/Home";
import Projects from "./components/project/Projects";
import Project from "./components/project/Project";
import { PUBLIC_PATH } from "./app/variables";

const Router: React.FC = () => {
  return (
    <BrowserRouter basename={PUBLIC_PATH}>
      <Layout>
        <Routes>
          <Route path="projects" element={<Projects />} />
          <Route path="projects/*" element={<Project />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<h2>Stránka nebyla nalezena</h2>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
