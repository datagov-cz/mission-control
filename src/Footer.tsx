import React from "react";
import { Divider, Typography, Box, Container } from "@mui/material";

import opzLogo from "./images/opz_logo.svg";
import t from "./components/i18n";
import EUIcon from "./EUIcon";

type FooterProps = {
  direction?: "row" | "column";
};

const Footer: React.FC<FooterProps> = ({ direction = "row" }) => (
  <>
    <Divider />
    <Container>
      <Box
        my={1}
        display="flex"
        flexDirection={direction}
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="body2">
          {t`common.publicityFirstLine`}
          <br />
          {t`common.publicitySecondLine`}
        </Typography>
        <Box my={1} />
        <EUIcon/>
      </Box>
    </Container>
  </>
);

export default Footer;
