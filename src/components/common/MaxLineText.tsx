import React from "react";
import { styled, Typography, TypographyProps } from "@mui/material";

interface MaxLineTextProp {
  maxlines: number;
}
const MaxLineText: React.FC<TypographyProps & MaxLineTextProp> = (props) => {
  const Text = styled(Typography)(({ theme }) => ({
    position: "relative",
    maxHeight: `calc((${theme.typography.body1.lineHeight} * ${theme.typography.body1.fontSize} * ${props.maxlines}) )`,
    overflow: "hidden",
    paddingRight: "1.6rem" /* space for ellipsis */,
    "&::before": {
      position: "absolute",
      content: '"\\002026"',
      bottom: 0,
      right: 0,
    },
    "&::after": {
      content: '""',
      position: "absolute",
      right: 0,
      width: "1.7rem",
      height: "2.1rem",
      background: "#1E87AF",
      //background: "yellow"
    },
    "& em": {
      fontStyle: "normal",
      fontWeight: 600,
    },
  }));
  return <Text {...props}>{props.children}</Text>;
};

export default MaxLineText;
