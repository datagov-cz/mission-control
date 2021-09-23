import React, { useRef, useEffect, useMemo } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import { Network, Data, Node, Edge } from "vis-network";
import { flatten, uniq } from "lodash";

import { getVocabularyShortLabel } from "@opendata-mvcr/assembly-line-shared";

import { Iri } from "@types";
import vocabularyTypes from "app/vocabularyTypes.json";

import { useObservableSuspense } from "observable-hooks";
import { workspaceVocabularyDependenciesResource } from "data/vocabularies";

const getVocabularyLevel = (iri: Iri) => {
  for (const type of vocabularyTypes) {
    if (iri.startsWith(type.prefix)) {
      return type.level;
    }
  }
  return 0;
};

const getNormalizedLevelMapping = (vocabularies: Iri[]) => {
  const levels = new Set<number>();
  vocabularies.forEach((vocabulary) => {
    levels.add(getVocabularyLevel(vocabulary));
  });
  const mapping = new Map<number, number>();
  Array.from(levels)
    .sort()
    .forEach((key, index) => {
      mapping.set(key, index);
    });
  return mapping;
};

const getNormalizedVocabularyLevel = (
  iri: Iri,
  normalizedMapping: Map<number, number>
) => {
  return normalizedMapping.get(getVocabularyLevel(iri));
};

const buildGraph = (dependencies: Record<Iri, Iri[]>): Data => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  const mainVocabularies = Object.keys(dependencies);
  const dependencyVocabularies = uniq(
    flatten(mainVocabularies.map((key) => dependencies[key])).filter(
      (dep) => !mainVocabularies.includes(dep)
    )
  );

  const normalizedLevelMapping = getNormalizedLevelMapping(
    mainVocabularies.concat(dependencyVocabularies)
  );

  mainVocabularies.forEach((iri) => {
    nodes.push({
      id: iri,
      label: getVocabularyShortLabel(iri) || iri,
      color: "#FFFFFF",
      level: getNormalizedVocabularyLevel(iri, normalizedLevelMapping),
    });
  });

  dependencyVocabularies.forEach((iri) => {
    nodes.push({
      id: iri,
      label: getVocabularyShortLabel(iri) || iri,
      color: "#FFD500",
      level: getNormalizedVocabularyLevel(iri, normalizedLevelMapping),
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

const graphOptions = {
  nodes: {
    shape: "box",
  },
  edges: {
    smooth: {
      enabled: true,
      type: "curvedCW",
      roundness: 0.15,
    },
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
    improvedLayout: true,
    hierarchical: {
      enabled: true,
      nodeSpacing: 200,
      levelSeparation: 100,
    },
  },
  physics: {
    enabled: false,
  },
};

const Canvas = styled("div")({
  width: "100%",
  height: 500,
});

const VocabulariesDependencies: React.FC = () => {
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
      <Canvas ref={canvas}></Canvas>
    </Box>
  );
};

export default VocabulariesDependencies;
