import React from "react";
import "./../../_chatbox.scss";

//#region mui-ui
import { Grid, Box, Link } from "@mui/material";
import MuiTypography from "@mui/material/Typography";
//#endregion
const ChatBody = () => {
  return (
    <>
      <Grid className="chat__body" item sx={12}>
        <Box>ChatBody</Box>
      </Grid>
    </>
  );
};

export default ChatBody;
