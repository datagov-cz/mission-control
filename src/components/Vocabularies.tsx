import React from "react";
import { useVocabularies } from "../api/VocabularyApi";
import { Typography } from "@mui/material";
import t from "./i18n";

const Vocabularies: React.FC = () => {
  const { data = [], isLoading } = useVocabularies();
  if (isLoading) return <Typography variant={"h4"}>{t`loading`}</Typography>
  return (
    <div>
      <Typography variant={"h4"}>{t`myPanel`}</Typography>
      <ul>
        {data.map((vocabulary) => (
          <li>{vocabulary.label}</li>
        ))}
      </ul>
    </div>
  );
};

export default Vocabularies;
