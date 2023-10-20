import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import { useSnackbar } from "notistack";
import { HTTP_STATUS } from "@constants/httpStatus";
import Google from "@assets/images/icons/social-google.svg";
import { navigateLocation } from "@routes/navigateLocation";
//#region mui-ui
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import severity from "@constants/severity";
import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "@mui/material";
//#endregion
//#region redux providers
import {
  SHOW_PROGRESSBAR,
  HIDE_PROGRESSBAR,
} from "@components/mui-ui/progressBar/progressBar.reducer";
import { useDispatch } from "react-redux";
import { SIGNIN_SOCIAL_GOOGLE } from "@reduxproviders/auth.reducer";
//#endregion
import AnimateButton from "@components/mui-ui/extended/animateButton";

const SocialButtons = (props) => {
  const navigate = useNavigate();

  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [socialSignIn, setSocialSignIn] = React.useState(["GOOGLE"]);

  //#region useHook
  React.useEffect(() => {
    if (props.socialSignIn !== undefined && props.socialSignIn !== null)
      setSocialSignIn(props.socialSignIn);
  }, [props.socialSignIn]);
  //#endregion

  //#region handle events
  const signInGoogle = useGoogleLogin({
    onSuccess: async (results) => {
      dispatch(SHOW_PROGRESSBAR());
      await dispatch(
        SIGNIN_SOCIAL_GOOGLE({ access_token: results.access_token })
      )
        .unwrap()
        .then((response) => {
          dispatch(HIDE_PROGRESSBAR());
          responseValidate(response);
        })
        .catch((error) => {
          dispatch(HIDE_PROGRESSBAR());
          // variant could be success, error, warning, info, or default
          enqueueSnackbar(error, {
            variant: severity.error,
          });
        });
    },
    // flow: "auth-code",
  });

  const responseValidate = (response) => {
    if (response.code === HTTP_STATUS.OK) {
      if (response.ok) {
        if (response.rs.verified_token) {
          navigate(navigateLocation.CLIENT_APP.COMMUNITY.DEFAULT);
        } else {
          //* verify 2FA
          navigate(
            navigateLocation.CLIENT_APP.COMMUNITY.AUTH.CODE_VERIFICATION
          );
        }
      } else {
        //* show message
        setShowMessageAlert(true);
        setMessageContentAlert(t("authentication.wrong_credential"));
      }
    } else {
      enqueueSnackbar(response.message, {
        variant: severity.error,
      });
    }
  };

  //#endregion

  //#region render content
  const renderSocialExternal = {
    GOOGLE: () => {
      return (
        <Grid item xs={12}>
          <AnimateButton>
            <Button
              className="btn-google"
              disableElevation
              fullWidth
              onClick={signInGoogle}
              size="large"
              variant="outlined"
            >
              <Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
                <img src={Google} alt="google" width={16} height={16} />
              </Box>
              {t("authentication.signinwithgoogle")}
            </Button>
          </AnimateButton>
        </Grid>
      );
    },
  };
  //#endregion

  return (
    <>
      {socialSignIn?.map((s) => {
        return renderSocialExternal[s]();
      })}
    </>
  );
};

export default SocialButtons;