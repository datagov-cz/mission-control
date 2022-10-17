import React from "react";
import { useVocabularies } from "../api/VocabularyApi";

const Vocabularies: React.FC = () => {
  const { data = [], isLoading } = useVocabularies();
  if (isLoading) return <h2>Loading...</h2>;
  return (
    <div>
      <h2>Vocabularies</h2>
      <ul>
        {data.map((vocabulary) => (
          <li>{vocabulary.label}</li>
        ))}
      </ul>
    </div>
  );
};

export default Vocabularies;
