import React from "react";
import "./../../_chatbox.scss";

//#region mui-ui
import { Grid, Link } from "@mui/material";
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
      <Grid className="chat__messagetyping" item xs={12}>
        <Grid container direction="column" spacing={1}>
          Chat message typing
        </Grid>
      </Grid>
    </>
  );
};

export default ChatFooter;
