import "../_auth.scss";
import * as React from "react";
import { useTranslation } from "react-i18next";
import _schema from "./_schema";
//#region mui-ui
import Link from "@mui/material/Link";
import { hookInstance } from "@utils/hookInstance";
import { navigateLocation } from "@routes/navigateLocation";
import { useTheme } from "@mui/material/styles";
import { Divider, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
//#endregion
//#region components
import AuthWrapper from "../authWrapper";
import AuthCardWrapper from "../authCardWrapper";
import FormForgotPassword from "../forms/forgotPassword";
import Logo from "@components/ui/logo";
// import AuthFooter from "../authFooter";
//#endregion

const ForgotPassword = (props) => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const { t } = useTranslation();

  return (
    <AuthWrapper>
      <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
        <AuthCardWrapper className="auth forgot-password">
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
                      {t("authentication.forgotpassword")}
                    </Typography>
                    <Typography
                      variant="caption"
                      fontSize="16px"
                      textAlign={matchDownSM ? "center" : "inherit"}
                    >
                      {t("authentication.enteryouemailaddressresetpassword")}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <FormForgotPassword />
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
                    href={navigateLocation.AUTH.SIGNIN}
                    underline="none"
                    variant="subtitle1"
                    color={theme.palette.grey[900]}
                  >
                    {t("authentication.alreadyhaveanaccount")}
                  </Link>
                  <Link
                    href={navigateLocation.AUTH.SIGNUP}
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

export default ForgotPassword;
