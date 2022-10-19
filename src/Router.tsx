import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./components/Home";
import Vocabularies from "./components/Vocabularies";
import Projects from "./components/Projects";
import Project from "./components/Project";

//for those familiar with v5 of the router see: https://reactrouter.com/en/v6.3.0/upgrading/v5

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="vocabularies" element={<Vocabularies />} />
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
