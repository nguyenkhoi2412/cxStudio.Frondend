import "../_auth.scss";
import * as React from "react";
import { useTranslation } from "react-i18next";
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
import FormChangePassword from "../forms/changePassword";
import Logo from "@components/ui/imagesvg";
import LogoInDark from "@assets/images/logo-culture-comminity-dark.svg";
import LogoInLight from "@assets/images/logo-culture-comminity-light.svg";
// import AuthFooter from "../authFooter";
//#endregion
//#region reduxprovider
import { useSelector } from "react-redux";
import { currentUserState } from "@reduxproviders/auth.reducer";
//#endregion

const ChangePassword = (props) => {
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const { t } = useTranslation();
  const currentUser = useSelector(currentUserState);

  return (
    <AuthWrapper>
      <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
        <AuthCardWrapper className="auth change-password">
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item sx={{ mb: 3 }}>
              <Link to="#">
                <Logo
                  src={customization.mode === "dark" ? LogoInDark : LogoInLight}
                />
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
                      {t("user.changepassword")}
                    </Typography>
                    <Typography
                      variant="caption"
                      fontSize="16px"
                      textAlign={matchDownSM ? "center" : "inherit"}
                    >
                      {currentUser.isAdmin
                        ? t("user.createnewpasswordforanyuser")
                        : t("user.createnewpassword")}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <FormChangePassword />
            </Grid>
            {/* <Grid item xs={12}>
              <Divider />
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
            </Grid> */}
          </Grid>
        </AuthCardWrapper>
      </Grid>
    </AuthWrapper>
  );
};

export default ChangePassword;
