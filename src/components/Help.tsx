import React, { useState, useRef } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  Popper,
} from "@mui/material";
import { styled } from "@mui/system";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import { BUG_TRACKER_URL, FEATURE_TRACKER_URL } from "../app/variables";

import t from "./i18n";

const HelpButton = styled(Button)(({ theme }) => ({
  color: theme.palette.warning.contrastText,
  backgroundColor: theme.palette.warning.main,
  "&:hover": {
    backgroundColor: theme.palette.warning.dark,
  },
}));

const Help: React.FC = () => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

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
        sx={{ marginRight: 2 }}
      >
        <Button href={BUG_TRACKER_URL} color="warning">{t`reportBug`}</Button>
        <HelpButton onClick={handleToggle} sx={{ p: 0.5, minWidth: 3 }}>
          <ArrowDropDownIcon />
        </HelpButton>
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
                <HelpButton
                  variant="contained"
                  onClick={handleClose}
                  href={FEATURE_TRACKER_URL}
                >
                  {t`requestFeature`}
                </HelpButton>
              </ClickAwayListener>
            </Box>
          </Grow>
        )}
      </Popper>
    </Box>
  );
};

export default Help;
