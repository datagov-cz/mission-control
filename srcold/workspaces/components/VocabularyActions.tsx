import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@material-ui/core'

import Actions from 'app/actions'
import t from 'app/components/i18n'
import { Vocabulary } from 'workspaces/types'
import { getWorkspace } from 'workspaces/selectors'

type VocabularyActionsProps = {
  vocabulary: Vocabulary
}

const VocabularyActions: React.FC<VocabularyActionsProps> = ({
  vocabulary,
}) => {
  const dispatch = useDispatch()
  const workspace = useSelector(getWorkspace)

  const handleDeleteClick = () =>
    dispatch(Actions.Workspaces.openDeleteVocabularyForm(vocabulary))

  const handleUpdateClick = () =>
    dispatch(
      Actions.Workspaces.updateVocabulary.request({ workspace, vocabulary })
    )

  return (
    <>
      <Button
        onClick={handleUpdateClick}
        color="secondary"
        disabled={!vocabulary.isReadOnly}
      >{t`update`}</Button>
      <Button onClick={handleDeleteClick} color="secondary">{t`delete`}</Button>
    </>
  )
}

export default VocabularyActions
