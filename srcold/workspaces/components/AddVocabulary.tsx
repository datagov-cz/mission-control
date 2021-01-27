import React from 'react'
import { Fab } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import t from 'app/components/i18n'
import Actions from 'app/actions'
import useDispatchAction from 'app/hooks/useDispatchAction'
import AddVocabularyForm from './AddVocabularyForm'

const AddVocabulary: React.FC<{}> = () => {
  const openForm = useDispatchAction(
    Actions.Workspaces.openAddVocabularyForm(true)
  )

  return (
    <>
      <Fab variant="extended" size="medium" color="primary" onClick={openForm}>
        <AddIcon />
        {t`addVocabulary`}
      </Fab>
      <AddVocabularyForm />
    </>
  )
}

export default AddVocabulary
