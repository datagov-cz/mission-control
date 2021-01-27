import React from 'react'
import { Fab } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

import t from 'components/i18n'
import AddVocabularyForm from './AddVocabularyForm'
import useToggle from 'hooks/useToggle'

const AddVocabulary: React.FC<{}> = () => {
  const { isOpen, open, close } = useToggle()

  return (
    <>
      <Fab variant="extended" size="medium" color="primary" onClick={open}>
        <AddIcon />
        {t`addVocabulary`}
      </Fab>
      <AddVocabularyForm isOpen={isOpen} onClose={close} />
    </>
  )
}

export default AddVocabulary
