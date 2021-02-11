import React, { ReactNode } from 'react'
import {
  Dialog as MuiDialog,
  DialogProps as MuiDialogProps,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  makeStyles,
  IconButton,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import Form from './Form'

export type DialogProps = Omit<
  MuiDialogProps,
  'open' | 'onClose' | 'title' | 'onSubmit'
> & {
  isOpen: boolean
  title: ReactNode
  onClose: () => void
}

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}))

const Dialog: React.FC<DialogProps> = ({
  isOpen,
  title,
  children,
  onClose,
  ...props
}) => {
  const classes = useStyles()
  return (
    <Form>
      <MuiDialog
        open={isOpen}
        onClose={onClose}
        fullWidth
        maxWidth="xs"
        {...props}
      >
        <DialogTitle disableTypography>
          <Typography variant="h6">{title}</Typography>
          {onClose ? (
            <IconButton
              aria-label="close"
              className={classes.closeButton}
              onClick={onClose}
            >
              <CloseIcon />
            </IconButton>
          ) : null}
        </DialogTitle>
        <DialogContent>
          {children}
          <Box my={1} />
        </DialogContent>
      </MuiDialog>
    </Form>
  )
}

export default Dialog
