import "../_auth.scss";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
//#region utils support
import { hookInstance } from "@utils/hookInstance";
import { isAuth } from "@utils/requireAuth";
//#endregion
//#region mui-ui
import { useTheme } from "@mui/material/styles";
import Link from "@mui/material/Link";
import { Divider, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
//#endregion
//#region components
import AuthWrapper from "../authWrapper";
import AuthCardWrapper from "../authCardWrapper";
import AuthMainContainer from "../authMainContainer";
import FormSignUp from "../forms/signUp";
import { navigateLocation } from "@routes/navigateLocation";
// import AuthFooter from "../authFooter";
//#endregion
//#region redux provider
//#endregion

const SignUp = (props) => {
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const { t } = useTranslation();

  //#region useEffect
  React.useEffect(() => {}, []);
  //#endregion

  return (
    <AuthWrapper>
      <AuthCardWrapper className="auth sign-up">
        <AuthMainContainer>
          <Grid item xs={12}>
            <Grid
              container
              direction={matchDownSM ? "column-reverse" : "row"}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item>
                <Stack alignItems="center" justifyContent="center" spacing={1}>
                  <Typography
                    color="primary"
                    gutterBottom
                    variant={matchDownSM ? "h3" : "h2"}
                  >
                    {t("authentication.signup")}
                  </Typography>
                  <Typography
                    variant="caption"
                    fontSize="16px"
                    textAlign={matchDownSM ? "center" : "inherit"}
                  >
                    {t("authentication.enteryourcredentialstocontinue")}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <FormSignUp />
          </Grid>
          {isAuth() ? (
            <></>
          ) : (
            <>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Grid
                  item
                  container
                  direction="column"
                  alignItems="center"
                  xs={12}
                >
                  <Link
                    href={navigateLocation.DASHBOARD.AUTH.SIGNIN}
                    underline="none"
                    variant="subtitle1"
                    color={theme.palette.grey[900]}
                  >
                    {t("authentication.alreadyhaveanaccount")}
                  </Link>
                </Grid>
              </Grid>
            </>
          )}
        </AuthMainContainer>
      </AuthCardWrapper>
    </AuthWrapper>
  );
};

export default React.memo(SignUp, (props, nextProps) => {
  if (props === nextProps) {
    // return true if you don't need re-render
    return true;
  }
});
