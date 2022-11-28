import { Button, styled } from "@mui/material";

export const ActionButtonWhite = styled(Button)(() => ({
  color: "black",
  backgroundColor: "white",
  "&:hover": {
    color: "black",
    backgroundColor: "white",
  },
}));

export const ActionButton = styled(Button)(() => ({
  color: "white",
  background: "linear-gradient(90deg, #2C397E, 10.42%, #1B96B9 100%)",
  "&:hover": {
    color: "white",
    background: "linear-gradient(90deg, #2C397E, 10.42%, #1B96B9 100%)",
  },
}));
