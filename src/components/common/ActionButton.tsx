import { Button, styled } from "@mui/material";
import { LINEAR_BACKGROUND } from "../../utils/Constants";

export interface ActionButtonProps {
  textColor?: string;
  backgroundColor?: string;
  disabled?: boolean;
}

export const ActionButton = styled(Button, {
  shouldForwardProp: (prop) =>
    prop !== "textColor" && prop !== "backgroundColor",
})<ActionButtonProps>(
  ({ theme, backgroundColor = LINEAR_BACKGROUND, textColor = "white" }) => ({
    color: textColor,
    background: backgroundColor,
    whiteSpace: "nowrap",
    minWidth: "max-content",
    paddingLeft: 16,
    paddingRight: 16,
    "&:hover": {
      color: textColor,
      background: backgroundColor,
    },
  })
);
