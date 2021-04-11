import React, { useRef, useEffect, useMemo } from "react";
import { Box, makeStyles } from "@material-ui/core";
import { Network, Data, Node, Edge } from "vis-network";
import { flatten } from "lodash";

import { getVocabularyShortLabel } from "@opendata-mvcr/assembly-line-shared";

import { Iri } from "@types";

import { useObservableSuspense } from "observable-hooks";
import { workspaceVocabularyDependenciesResource } from "data/vocabularies";

const buildGraph = (dependencies: Record<Iri, Iri[]>): Data => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  const mainVocabularies = Object.keys(dependencies);
  const dependencyVocabularies = flatten(
    mainVocabularies.map((key) => dependencies[key])
  ).filter((dep) => !mainVocabularies.includes(dep));

  mainVocabularies.forEach((iri) => {
    nodes.push({
      id: iri,
      label: getVocabularyShortLabel(iri) || iri,
    });
  });

  dependencyVocabularies.forEach((iri) => {
    nodes.push({
      id: iri,
      label: getVocabularyShortLabel(iri) || iri,
      color: "#FFD500",
    });
  });

  mainVocabularies.map((key) =>
    dependencies[key].forEach((dep) => {
      edges.push({ from: key, to: dep });
    })
  );

  return {
    nodes,
    edges,
  };
};

const useStyles = makeStyles({
  root: {
    background: "#263238 linear-gradient(5deg, #057fa5 0%, #263238 100%)",
  },
  canvas: {
    width: "100%",
    height: 500,
  },
});

const graphOptions = {
  nodes: {
    shape: "box",
  },
  edges: {
    smooth: false,
    color: "#000000",
    width: 0.5,
    arrows: {
      to: {
        enabled: true,
        scaleFactor: 0.5,
      },
    },
  },
  layout: {
    hierarchical: {
      enabled: false,
      nodeSpacing: 200,
    },
  },
};

const VocabulariesDependencies: React.FC = () => {
  const classes = useStyles();
  const canvas = useRef<HTMLDivElement>(null);

  const dependencies = useObservableSuspense(
    workspaceVocabularyDependenciesResource
  );

  const data = useMemo(() => buildGraph(dependencies), [dependencies]);

  useEffect(() => {
    new Network(canvas.current!, data, graphOptions);
  }, [data]);

  return (
    <Box paddingBottom={2}>
      <div className={classes.canvas} ref={canvas}></div>
    </Box>
  );
};

export default VocabulariesDependencies;
