import React from "react";
import "@chatbox/_chatbox.scss";

//#region mui-ui
import { Grid, Box, Stack, Link } from "@mui/material";
import MuiTypography from "@mui/material/Typography";
//#endregion
//#region reducer
import { useSelector } from "react-redux";
//#endregion
//#region import components
import MainCard from "@components/mui-ui/cards";
import SubCard from "@components/mui-ui/cards/subCard";
import SecondaryAction from "@components/mui-ui/cards/cardSecondaryAction";
import { gridSpacing } from "@constants";
//#endregion

const RenderMessage = (props) => {
  const currentUser = useSelector((state) => state.auth.currentUser);

  const [message, setMessage] = React.useState("");

  //#region useHooks
  React.useEffect(() => {
    console.log('sdfsdfsdfsdf', props.message);
    setMessage(props.message);
  }, [props.message]);
  //#endregion

  return (
    <Grid
      key={message._id}
      item
      xs={12}
      sm={7}
      className={
        message.username === currentUser.username ? "chat__me" : "chat__other"
      }
    >
      <MainCard>
        <Grid item>
          <Stack direction="column">
            <MuiTypography component="p" gutterBottom>
              {message.message}
            </MuiTypography>
            <MuiTypography align="right" variant="caption" gutterBottom>
              Oct.01.2023
            </MuiTypography>
          </Stack>
        </Grid>
      </MainCard>
    </Grid>
  );
};

export default RenderMessage;
