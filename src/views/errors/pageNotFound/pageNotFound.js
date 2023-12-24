import "@authentication/_auth.scss";
import "./../_error.scss";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { hook } from "@utils/crossCutting";
import { navigateLocation } from "@routes/navigateLocation";
//#region mui-ui
import Link from "@mui/material/Link";
import { useTheme } from "@mui/material/styles";
import {
  Divider,
  Grid,
  Stack,
  Typography,
  Button,
  useMediaQuery,
} from "@mui/material";
//#endregion
//#region components
import ErrorWrapper from "@views/errors/errorWrapper";
import ErrorCardWrapper from "@views/errors/errorCardWrapper";
// import FormSignIn from "../forms/signIn";
import Logo from "@components/common/imagesvg";
import LogoInDark from "@assets/images/logo-workspace-dark.svg";
import LogoInLight from "@assets/images/logo-workspace-light.svg";
import PageNotFound from "@assets/images/errorPages/page_notfound.svg";
import AnimateButton from "@components/mui-ui/extended/animateButton";
// import AuthFooter from "../authFooter";
//#endregion

const Error404 = (props) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const customization = useSelector((state) => state.customization);
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const { t } = useTranslation();

  const handleBtnGoBackHome = () => {
    navigate(navigateLocation.CLIENT_APP.APP);
  };

  return (
    <ErrorWrapper>
      <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
        <ErrorCardWrapper className="auth sign-in">
          <Grid container spacing={2} alignItems="center" justifyContent="left">
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
                      className="code"
                    >
                      <span>404</span>
                    </Typography>
                    <Typography
                      color="primary"
                      gutterBottom
                      variant={matchDownSM ? "h3" : "h2"}
                      className="title-name"
                    >
                      {t("error.page_not_found")}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <AnimateButton>
                <Button
                  disableElevation
                  // disabled={submitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  onClick={handleBtnGoBackHome}
                >
                  {t("common.go_back_home")}
                </Button>
              </AnimateButton>
            </Grid>
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
                <Typography
                  variant="caption"
                  fontSize="24px"
                  textAlign={matchDownSM ? "center" : "inherit"}
                >
                  {t("error.something_wrong_here")}
                </Typography>
                <Typography
                  variant="caption"
                  fontSize="24px"
                  textAlign={matchDownSM ? "center" : "inherit"}
                >
                  {t("error.sorry_technical_issues")}
                </Typography>
                <Typography
                  variant="caption"
                  fontSize="24px"
                  textAlign={matchDownSM ? "center" : "inherit"}
                >
                  {t("error.try_to_refresh_thepage")}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </ErrorCardWrapper>
      </Grid>
    </ErrorWrapper>
  );
};

export default Error404;
