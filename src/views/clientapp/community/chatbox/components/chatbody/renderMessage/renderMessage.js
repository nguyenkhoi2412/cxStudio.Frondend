import React from "react";
import "@chatbox/_chatbox.scss";
import { useTranslation } from "react-i18next";
import { dateExtension } from "@utils/helpersExtension";

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
  const { t } = useTranslation();
  const currentUser = useSelector((state) => state.auth.currentUser);

  const [message, setMessage] = React.useState("");
  const [postedOn, setPostedOn] = React.useState();
  const [isYou, setIsYou] = React.useState(false);

  //#region useHooks
  React.useEffect(() => {
    console.log("sdfsdfsdf", props);
    setMessage(props.message);
    setPostedOn(props.message.postedOn);
    setIsYou(props.message.username === currentUser.username);
  }, [props.message]);
  //#endregion

  return (
    <Grid
      key={message._id}
      item
      xs={12}
      sm={7}
      className={isYou ? "chat__me" : "chat__other"}
    >
      <MainCard>
        <Grid item>
          <Stack direction="column">
            <MuiTypography component="p" variant="subtitle1" gutterBottom>
              {isYou ? t("community.app.chatbox.you") : message.displayName}
              <MuiTypography align="right" variant="caption" gutterBottom>
                &nbsp; {dateExtension.getUtcDateTime(postedOn)?.local.time}
              </MuiTypography>
            </MuiTypography>
            <MuiTypography component="p" gutterBottom>
              {message.message}
            </MuiTypography>
          </Stack>
        </Grid>
      </MainCard>
    </Grid>
  );
};

export default React.memo(RenderMessage, (props, nextProps) => {
  if (props.message === nextProps.message) {
    // return true if you don't need re-render
    return true;
  }
});
