import React from 'react'
import { useSelector } from 'react-redux'
import { Typography } from '@material-ui/core'
import t from 'app/components/i18n'
import useActionForm from 'app/hooks/useActionForm'
import Actions from 'app/actions'
import {
  getIsDeleteVocabularyFormOpen,
  getWorkspace,
} from 'workspaces/selectors'
import useDispatchAction from 'app/hooks/useDispatchAction'
import FormDialog from 'app/components/FormDialog'

const DeleteVocabularyForm: React.FC<{}> = () => {
  const vocabularyToDelete = useSelector(getIsDeleteVocabularyFormOpen)
  const workspace = useSelector(getWorkspace)
  const closeForm = useDispatchAction(
    Actions.Workspaces.openDeleteVocabularyForm(false)
  )
  const { register, onSubmit } = useActionForm(
    Actions.Workspaces.deleteVocabulary.request
  )

  return (
    <FormDialog
      isOpen={vocabularyToDelete !== false}
      title={t`reallyDeleteVocabulary`}
      submitLabel={t`confirmDelete`}
      handleClose={closeForm}
      handleSubmit={onSubmit}
    >
      <form>
        <input
          type="hidden"
          name="workspaceId"
          value={workspace?.id}
          ref={register}
        />
        <input
          type="hidden"
          name="vocabularyId"
          value={(vocabularyToDelete && vocabularyToDelete.id) || ''}
          ref={register}
        />
        <Typography paragraph>{t`areYouSureToDeleteVocabulary`}</Typography>
      </form>
    </FormDialog>
  )
}

export default DeleteVocabularyForm
