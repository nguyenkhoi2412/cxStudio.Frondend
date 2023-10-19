import * as React from "react";
import { useTranslation } from "react-i18next";
import _schema from "./_schema";
import { navigateLocation } from "@routes/navigateLocation";
//#region mui-ui
import Link from "@mui/material/Link";
import { useTheme } from "@mui/material/styles";
import { Divider, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
//#endregion
//#region components
import AuthWrapper from "../authWrapper";
import AuthCardWrapper from "../authCardWrapper";
import AuthMainContainer from "../authMainContainer";
import FormSignIn from "../forms/signIn";
// import AuthFooter from "../authFooter";
//#endregion

const SignIn = (props) => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const { t } = useTranslation();

  return (
    <AuthWrapper>
      <AuthCardWrapper className="auth sign-in">
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
                    {t("authentication.hiwelcomeback")}
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
            <FormSignIn />
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Grid item container direction="column" alignItems="center" xs={12}>
              <Link
                href={navigateLocation.CLIENT_APP.COMMUNITY.AUTH.SIGNUP}
                underline="none"
                variant="subtitle1"
                color={theme.palette.grey[900]}
              >
                {t("authentication.donthaveanaccount")}
              </Link>
            </Grid>
          </Grid>
        </AuthMainContainer>
      </AuthCardWrapper>
    </AuthWrapper>
  );
};

export default SignIn;
