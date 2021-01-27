import React, { useCallback } from 'react'
import { Button } from '@material-ui/core'

import { Vocabulary } from '@types'

import t from 'components/i18n'

type VocabularyActionsProps = {
  vocabulary: Vocabulary
  onUpdate: (vocabulary: Vocabulary) => void
  onDelete: (vocabulary: Vocabulary) => void
}

const VocabularyActions: React.FC<VocabularyActionsProps> = ({
  vocabulary,
  onUpdate,
  onDelete,
}) => {
  const onUpdateClick = useCallback(() => onUpdate(vocabulary), [
    onUpdate,
    vocabulary,
  ])
  const onDeleteClick = useCallback(() => onDelete(vocabulary), [
    onDelete,
    vocabulary,
  ])

  return (
    <>
      <Button
        onClick={onUpdateClick}
        color="secondary"
        disabled={!vocabulary.isReadOnly}
      >{t`update`}</Button>
      <Button onClick={onDeleteClick} color="secondary">{t`delete`}</Button>
    </>
  )
}

export default VocabularyActions
