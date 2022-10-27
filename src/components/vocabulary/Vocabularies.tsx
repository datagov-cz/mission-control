import React, { useState } from "react";
import { useVocabularies } from "../../api/VocabularyApi";
import { Typography } from "@mui/material";
import t from "../i18n";
import VocabularyListItem from "./VocabularyListItem";

const Vocabularies: React.FC = () => {
  const { data = [], isLoading } = useVocabularies();
  const [isWaiting, setIsWaiting] = useState(false);
  if (isLoading || isWaiting) return <Typography variant={"h4"}>{t`loading`}</Typography>;
  return (
    <div>
      <Typography variant={"h4"}>{t`myPanel`}</Typography>
      {data.map((vocabulary) => (
        <VocabularyListItem vocabulary={vocabulary} key={vocabulary.label} setIsWaiting={setIsWaiting}/>
      ))}

    </div>
  );
};

export default Vocabularies;
