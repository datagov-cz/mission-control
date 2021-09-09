import React, { useCallback, useTransition } from "react";
import { Button } from "@mui/material";

import { Vocabulary } from "@types";

import t from "components/i18n";

type VocabularyActionsProps = {
  vocabulary: Vocabulary;
  onUpdate: (vocabulary: Vocabulary) => void;
  onDelete: (vocabulary: Vocabulary) => void;
};

const VocabularyActions: React.FC<VocabularyActionsProps> = ({
  vocabulary,
  onUpdate,
  onDelete,
}) => {
  const [isPending, startTransition] = useTransition();

  const onUpdateClick = useCallback(
    () => startTransition(() => onUpdate(vocabulary)),
    [startTransition, onUpdate, vocabulary]
  );

  const onDeleteClick = useCallback(
    () => onDelete(vocabulary),
    [onDelete, vocabulary]
  );

  return (
    <>
      <Button
        onClick={onUpdateClick}
        color="secondary"
        disabled={!vocabulary.isReadOnly || isPending}
      >
        {isPending ? t`updating` : t`update`}
      </Button>
      <Button onClick={onDeleteClick} color="secondary">{t`delete`}</Button>
    </>
  );
};

export default VocabularyActions;
