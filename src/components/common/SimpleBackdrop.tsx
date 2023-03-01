import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

interface SimpleBackdropProps {
  show: boolean;
}
const SimpleBackdrop: React.FC<SimpleBackdropProps> = ({ show }) => {
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={show}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default SimpleBackdrop;
