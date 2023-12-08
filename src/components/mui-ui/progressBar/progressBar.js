import "./_progressBar.scss";
import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { useSelector } from "react-redux";
import { progressBarState } from "./progressBar.reducer";

const WpProgressBar = () => {
  const dataState = useSelector(progressBarState);

  return (
    <>
      {dataState.open ? (
        <Box className="progress" sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      ) : (
        <></>
      )}
    </>
  );
};

export default WpProgressBar;
