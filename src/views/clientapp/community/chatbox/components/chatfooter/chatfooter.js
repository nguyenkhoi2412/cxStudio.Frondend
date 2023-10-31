import React from "react";
import "./../../_chatbox.scss";

//#region mui-ui
import { Grid, Box, Link } from "@mui/material";
import MuiTypography from "@mui/material/Typography";
//#endregion
//#region reducer
import { useSelector } from "react-redux";
//#endregion

const ChatFooter = () => {
  // variables
  const socket = useSelector(
    (state) => state.customization.configSettings.socket
  );

  return (
    <>
      <Grid className="chat__footer" item sx={12}>
        <Box>Chat message typing</Box>
      </Grid>
    </>
  );
};

export default ChatFooter;
