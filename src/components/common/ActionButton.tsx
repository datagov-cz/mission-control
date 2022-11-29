import { Button, styled } from "@mui/material";
import { LINEAR_BACKGROUND } from "../../utils/Constants";

export interface ActionButtonProps {
  textColor?: string;
  backgroundColor?: string;
}

export const ActionButton = styled(Button, {
  shouldForwardProp: (prop) =>
    prop !== "textColor" && prop !== "backgroundColor",
})<ActionButtonProps>(
  ({ theme, backgroundColor = LINEAR_BACKGROUND, textColor = "white" }) => ({
    color: textColor,
    background: backgroundColor,
    "&:hover": {
      color: textColor,
      background: backgroundColor,
    },
  })
);
