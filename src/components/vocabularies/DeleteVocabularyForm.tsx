import React, { useCallback } from 'react'
import { Typography } from '@material-ui/core'

import { DeleteVocabularyPayload, Vocabulary, Workspace } from '@types'

import t from 'components/i18n'
import FormDialog from 'components/form/FormDialog'
import Hidden from 'components/form/Hidden'
import { deleteVocabulary, fetchWorkspaceVocabularies } from 'data/vocabularies'

type DeleteVocabularyFormProps = {
  isOpen: boolean
  onClose: () => void
  workspace?: Workspace
  vocabulary?: Vocabulary
}

const DeleteVocabularyForm: React.FC<DeleteVocabularyFormProps> = ({
  isOpen,
  onClose,
  workspace,
  vocabulary,
}) => {
  const onSubmit = useCallback(
    (data: DeleteVocabularyPayload) =>
      deleteVocabulary(data).subscribe(() => {
        onClose()
        fetchWorkspaceVocabularies(workspace!.id)
      }),
    [onClose, workspace]
  )

  return (
    <FormDialog
      isOpen={isOpen}
      title={t`reallyDeleteVocabulary`}
      submitLabel={t`confirmDelete`}
      onClose={onClose}
      onSubmit={onSubmit}
    >
      <Hidden name="workspaceId" value={workspace?.id || ''} />
      <Hidden name="vocabularyId" value={vocabulary?.id || ''} />
      <Typography paragraph>{t`areYouSureToDeleteVocabulary`}</Typography>
    </FormDialog>
  )
}

export default DeleteVocabularyForm
