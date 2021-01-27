import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Menu, MenuItem } from '@material-ui/core'
import TranslateIcon from '@material-ui/icons/Translate'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { Locale } from 'app/types'
import { getLocale } from 'app/selectors'
import Actions from 'app/actions'
import t, { Namespace } from './i18n'

const LanguageSelector: React.FC<{}> = () => {
  const dispatch = useDispatch()
  const locale = useSelector(getLocale)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const selectLocale = (locale: Locale) => {
    handleClose()
    dispatch(Actions.App.setLocale(locale))
  }

  const selectCs = () => selectLocale('cs')
  const selectEn = () => selectLocale('en')

  return (
    <Namespace.Provider value="app">
      <Button
        startIcon={<TranslateIcon color="inherit" />}
        endIcon={<ExpandMoreIcon color="inherit" />}
        onClick={handleClick}
        color="inherit"
      >
        {t(locale)}
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={selectCs}>{t`cs`}</MenuItem>
        <MenuItem onClick={selectEn}>{t`en`}</MenuItem>
      </Menu>
    </Namespace.Provider>
  )
}

export default LanguageSelector
