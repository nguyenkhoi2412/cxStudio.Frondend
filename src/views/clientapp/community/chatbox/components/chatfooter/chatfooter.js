import React from "react";
import "./_chatfooter.scss";

//#region mui-ui
import { Grid, Box, Link } from "@mui/material";
import MuiTypography from "@mui/material/Typography";
//#endregion
//#region reducer
import { useSelector } from "react-redux";
//#endregion
//#region components
import MessageSend from "@chatbox/components/chatfooter/messageSend";
import { gridSpacing } from "@constants";
//#endregion

const ChatFooter = () => {
  // variables
  const socket = useSelector(
    (state) => state.customization.configSettings.socket
  );

  return (
    <>
      <Grid item className="chat__footer">
        <Grid container spacing={gridSpacing}>
          <MessageSend />
        </Grid>
      </Grid>
    </>
  );
};

export default ChatFooter;
