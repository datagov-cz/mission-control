import React, { useState, useRef } from 'react'
import { BUG_TRACKER_URL, FEATURE_TRACKER_URL } from 'app/variables'
import {
  Box,
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  makeStyles,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from '@material-ui/core'
import { ArrowDropDown } from '@material-ui/icons'

import t from 'components/i18n'
import theme from 'app/theme'

const useStyles = makeStyles({
  root: {
    marginRight: theme.spacing(2),
  },
  button: {
    color: theme.palette.warning.contrastText,
    backgroundColor: theme.palette.warning.main,
    '&:hover': {
      backgroundColor: theme.palette.warning.dark,
    },
  },
})

const Help: React.FC = () => {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef<HTMLDivElement>(null)
  const classes = useStyles()

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event: React.MouseEvent<Node, MouseEvent>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event?.target as Node)
    ) {
      return
    }

    setOpen(false)
  }

  return (
    <Box display="flex" alignItems="center">
      <ButtonGroup
        variant="contained"
        color="secondary"
        ref={anchorRef}
        className={classes.root}
      >
        <Button
          href={BUG_TRACKER_URL}
          target="_blank"
          className={classes.button}
        >{t`reportBug`}</Button>
        <Button size="small" onClick={handleToggle} className={classes.button}>
          <ArrowDropDown />
        </Button>
      </ButtonGroup>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu">
                  <MenuItem
                    onClick={handleClose}
                    component="a"
                    href={FEATURE_TRACKER_URL}
                    target="_blank"
                  >
                    {t`requestFeature`}
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  )
}

export default Help
