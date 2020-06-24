import React from 'react'
import { useDispatch } from 'react-redux'
import { Button } from '@material-ui/core'

import Actions from 'app/actions'
import t from 'app/components/i18n'
import { Vocabulary } from 'workspaces/types'

type VocabularyActionsProps = {
  vocabulary: Vocabulary
}

const VocabularyActions: React.FC<VocabularyActionsProps> = ({
  vocabulary,
}) => {
  const dispatch = useDispatch()

  const handleClick = () =>
    dispatch(Actions.Workspaces.openDeleteVocabularyForm(vocabulary))

  return <Button onClick={handleClick} color="secondary">{t`delete`}</Button>
}

export default VocabularyActions
