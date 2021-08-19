import React, { useState, useRef } from "react";
import classnames from "classnames";
import {
  Box,
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  Popper,
} from "@material-ui/core";
import makeStyles from "@material-ui/styles/makeStyles";
import { ArrowDropDown } from "@material-ui/icons";

import { BUG_TRACKER_URL, FEATURE_TRACKER_URL } from "app/variables";

import t from "components/i18n";

const useStyles = makeStyles((theme) => ({
  root: {
    marginRight: theme.spacing(2),
  },
  button: {
    color: theme.palette.warning.contrastText,
    backgroundColor: theme.palette.warning.main,
    "&:hover": {
      backgroundColor: theme.palette.warning.dark,
    },
  },
  arrow: {
    padding: theme.spacing(0.5),
    minWidth: theme.spacing(3),
  },
}));

const Help: React.FC = () => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const classes = useStyles();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<Node, MouseEvent>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event?.target as Node)
    ) {
      return;
    }

    setOpen(false);
  };

  return (
    <Box display="flex" alignItems="center" position="relative">
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
        <Button
          onClick={handleToggle}
          className={classnames(classes.button, classes.arrow)}
        >
          <ArrowDropDown />
        </Button>
      </ButtonGroup>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: "center top",
            }}
          >
            <Box my={0.5}>
              <ClickAwayListener onClickAway={handleClose as () => void}>
                <Button
                  variant="contained"
                  onClick={handleClose}
                  href={FEATURE_TRACKER_URL}
                  target="_blank"
                  className={classes.button}
                >
                  {t`requestFeature`}
                </Button>
              </ClickAwayListener>
            </Box>
          </Grow>
        )}
      </Popper>
    </Box>
  );
};

export default Help;
