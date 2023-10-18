import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import { useFormik } from "formik";
import { helpersExtension, objectExtension } from "@utils/helpersExtension";
import storageHandler from "@constants/storageHandler";
import { getYupSchemaFromMetaData } from "@utils/yupSchemaCreator.js";
import { useSnackbar } from "notistack";
import { HTTP_STATUS } from "@constants/httpStatus";
import InputField from "@components/forms/inputField";
import _schema from "./../signIn/_schema";
import Google from "@assets/images/icons/social-google.svg";
import { useTheme } from "@mui/material/styles";
import { navigateLocation } from "@routes/navigateLocation";
//#region mui-ui
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import severity from "@constants/severity";
import { useGoogleLogin, GoogleLogin } from "@react-oauth/google";
import {
  Divider,
  Typography,
  Button,
  Stack,
  useMediaQuery,
} from "@mui/material";
//#endregion
//#region redux providers
import {
  SHOW_PROGRESSBAR,
  HIDE_PROGRESSBAR,
} from "@components/mui-ui/progressBar/progressBar.reducer";
import { useDispatch } from "react-redux";
import {
  VALIDATE_USER,
  SECURE_2FA_GENERATE_TOKEN,
  SIGNIN_SOCIAL_GOOGLE,
} from "@reduxproviders/auth.reducer";
//#endregion
import AnimateButton from "@components/mui-ui/extended/animateButton";

const FormSignIn = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));

  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [showMessageAlert, setShowMessageAlert] = React.useState(false);
  const [messageContentAlert, setMessageContentAlert] = React.useState();
  const [checked, setChecked] = React.useState(true);

  const validateUser = (values) => {
    helpersExtension.simulateNetworkRequest(100).then(async () => {
      await dispatch(VALIDATE_USER(values))
        .unwrap()
        .then((response) => {
          setSubmitting(false);
          dispatch(HIDE_PROGRESSBAR());
          responseValidate(response);

          formik.resetForm();
        })
        .catch((error) => {
          setSubmitting(false);
          dispatch(HIDE_PROGRESSBAR());
          // variant could be success, error, warning, info, or default
          enqueueSnackbar(error, {
            variant: severity.error,
          });
          formik.resetForm();
        });
    });
  };

  const signInGoogle = useGoogleLogin({
    onSuccess: async (results) => {
      dispatch(SHOW_PROGRESSBAR());
      await dispatch(
        SIGNIN_SOCIAL_GOOGLE({ access_token: results.access_token })
      )
        .unwrap()
        .then((response) => {
          setSubmitting(false);
          dispatch(HIDE_PROGRESSBAR());

          responseValidate(response);
          formik.resetForm();
        })
        .catch((error) => {
          setSubmitting(false);
          dispatch(HIDE_PROGRESSBAR());
          // variant could be success, error, warning, info, or default
          enqueueSnackbar(error, {
            variant: severity.error,
          });
          formik.resetForm();
        });
    },
    // flow: "auth-code",
  });

  const responseValidate = (response) => {
    if (response.code === HTTP_STATUS.OK) {
      if (response.ok) {
        if (response.rs.verified_token) {
          // navigate(navigateLocation.DASHBOARD.DEFAULT);
          navigate(navigateLocation.CLIENT_APP.COMMUNITY.DEFAULT);
        } else {
          //* send code verify to email
          dispatch(
            SECURE_2FA_GENERATE_TOKEN({
              id: response.rs.currentUser._id,
            })
          );
          //* verify 2FA
          navigate(navigateLocation.CLIENT_APP.COMMUNITY.AUTH.CODE_VERIFICATION);
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

  //#region useFormik
  const initialValues = _schema.initialValues();
  // const validationSchema = _schema.validation();
  const dataForm = _schema.dataForm();
  const [enableValidation, setEnableValidation] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: getYupSchemaFromMetaData(dataForm),
    validateOnChange: enableValidation,
    validateOnBlur: enableValidation,
    onSubmit: (values) => {
      setSubmitting(true);
      dispatch(SHOW_PROGRESSBAR());
      validateUser(values);
    },
  });
  //#endregion

  //#region handle event
  const handleSubmit = (event) => {
    event.preventDefault();

    if (submitting) return;

    setEnableValidation(true);
    formik.handleSubmit();
  };
  //#endregion

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
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
        <Grid item xs={12}>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
            <Button
              variant="outlined"
              className="btn-or"
              sx={{
                cursor: "unset",
                m: 2,
                py: 0.5,
                px: 7,
                borderColor: `${theme.palette.divider} !important`,
                color: `${theme.palette.grey[900]}!important`,
                fontWeight: 500,
              }}
              disableRipple
              disabled
            >
              <Typography
                variant="caption"
                fontSize="14px"
                textAlign={matchDownSM ? "center" : "inherit"}
              >
                {t("authentication.or")}
              </Typography>
            </Button>
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          container
          alignItems="center"
          justifyContent="center"
        >
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">
              {t("authentication.signinwithemailaddress")}
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          container
          alignItems="center"
          justifyContent="center"
        >
          <Box
            className="form"
            component="form"
            autoComplete="off"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            {dataForm.map((item, index) => {
              const errorText = objectExtension.getValue(
                formik,
                "errors." + item.field
              );
              let hasError =
                Boolean(
                  objectExtension.getValue(formik, "touched." + item.field)
                ) && errorText;
              let dataValue = objectExtension.getValue(
                formik,
                "values." + item.field
              );
              return (
                <InputField
                  margin="normal"
                  fullWidth
                  key={index}
                  id={item.id}
                  type={item.type}
                  tabIndex={item.tabIndex}
                  label={item.label}
                  name={item.field}
                  autoFocus={item.autoFocus}
                  setValue={formik.setFieldValue}
                  value={dataValue}
                  onChange={formik.handleChange}
                  error={hasError}
                  helperText={hasError ? errorText : ""}
                />
              );
            })}
            <FormControl fullWidth>
              <Collapse in={showMessageAlert}>
                <Alert
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setShowMessageAlert(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mb: 2 }}
                  severity="error"
                >
                  {messageContentAlert}
                </Alert>
              </Collapse>
            </FormControl>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={1}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={(event) => setChecked(event.target.checked)}
                    name="checked"
                  />
                }
                label="Remember me"
              />
              <Link
                href={navigateLocation.DASHBOARD.AUTH.FORGOT_PASSWORD}
                variant="body2"
                underline="none"
              >
                {t("authentication.forgotpassword")}
              </Link>
            </Stack>
            <AnimateButton>
              <Button
                disableElevation
                disabled={submitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                {t("authentication.signin")}
              </Button>
            </AnimateButton>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default FormSignIn;
