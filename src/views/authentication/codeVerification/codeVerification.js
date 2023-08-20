import "../_auth.scss";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { navigateLocation } from "@routes/navigateLocation";
import { useTranslation, Trans } from "react-i18next";
import _schema from "./_schema";
//#region mui-ui
import Link from "@mui/material/Link";
import { useSnackbar } from "notistack";
import { stringExtension } from "@utils/helpersExtension";
import { hookInstance } from "@utils/hookInstance";
import { useTheme } from "@mui/material/styles";
import { Divider, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
//#endregion
//#region components
import AuthWrapper from "../authWrapper";
import AuthCardWrapper from "../authCardWrapper";
import FormCodeVerification from "../forms/codeVerification";
import Logo from "@components/ui/imagesvg";
import severity from "@constants/severity";
//#endregion
//#region reduxprovider
import { useDispatch, useSelector } from "react-redux";
import {
  SECURE_2FA_GENERATE_TOKEN,
  currentUserState,
} from "@reduxproviders/auth.reducer";
//#endregion

const CodeVerification = (props) => {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const currentUser = useSelector(currentUserState);

  //#region useEffect
  React.useEffect(() => {}, []);
  //#endregion

  const resendCode = (e) => {
    //* send code verify to email
    dispatch(
      SECURE_2FA_GENERATE_TOKEN({
        id: currentUser._id,
      })
    )
      .unwrap()
      .then((result) => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar(result.message, {
          variant: severity.success,
        });
      })
      .catch((error) => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar(t("connection.error"), {
          variant: severity.error,
        });
      });
  };

  return (
    <AuthWrapper>
      <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
        <AuthCardWrapper className="auth verify-code">
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item sx={{ mb: 3 }}>
              <Link to="#">
                <Logo />
              </Link>
            </Grid>
            <Grid item xs={12}>
              <Grid
                container
                direction={matchDownSM ? "column-reverse" : "row"}
                alignItems="center"
                justifyContent="center"
              >
                <Grid item>
                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    spacing={1}
                  >
                    <Typography
                      color="primary"
                      gutterBottom
                      variant={matchDownSM ? "h3" : "h2"}
                    >
                      {t("authentication.enterverifycode")}
                    </Typography>
                    <Typography
                      variant={matchDownSM ? "h5" : "h4"}
                      fontSize="16px"
                      textAlign={matchDownSM ? "center" : "inherit"}
                    >
                      {t("authentication.wesendyouonemail")}
                    </Typography>
                    <Typography
                      variant="caption"
                      fontSize="16px"
                      textAlign={matchDownSM ? "center" : "inherit"}
                    >
                      {stringExtension.mungeEmailAddress(currentUser.email)}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <FormCodeVerification />
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2} className="resend-code">
                <Grid item xs={8}>
                  <Typography
                    variant="caption"
                    fontSize="14px"
                    textAlign={matchDownSM ? "center" : "inherit"}
                  >
                    {t("authentication.didnotreceivecodeverify")}
                  </Typography>
                </Grid>
                <Grid item xs={4} className="link">
                  <Typography
                    // variant={matchDownSM ? "h6" : "h5"}
                    fontSize="14px"
                    textAlign="right"
                  >
                    <Link
                      href="#"
                      color="primary"
                      underline="none"
                      onClick={resendCode}
                    >
                      {t("authentication.resendcode")}
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Divider
                sx={{ flexGrow: 1, marginBottom: 2 }}
                orientation="horizontal"
              />
              <Grid
                item
                container
                direction="column"
                alignItems="center"
                xs={12}
              >
                <Stack alignItems="center" justifyContent="center" spacing={1}>
                  <Link
                    href={navigateLocation.DASHBOARD.AUTH.SIGNIN}
                    underline="none"
                    variant="subtitle1"
                    color={theme.palette.grey[900]}
                  >
                    {t("authentication.alreadyhaveanaccount")}
                  </Link>
                  <Link
                    href={navigateLocation.DASHBOARD.AUTH.SIGNUP}
                    underline="none"
                    variant="subtitle1"
                    color={theme.palette.grey[900]}
                  >
                    {t("authentication.donthaveanaccount")}
                  </Link>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </AuthCardWrapper>
      </Grid>
    </AuthWrapper>
  );
};

export default CodeVerification;
