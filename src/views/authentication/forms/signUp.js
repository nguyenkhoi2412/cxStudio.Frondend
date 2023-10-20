import * as React from "react";
import { useTranslation, Trans } from "react-i18next";
import { useFormik } from "formik";
import { helpersExtension, objectExtension } from "@utils/helpersExtension";
import { strengthColor, strengthIndicator } from "@utils/passwordStrength";
import { useSnackbar } from "notistack";
import InputField from "@components/forms/inputField";
import SelectField from "@components/forms/selectField";
import _schema from "./../signUp/_schema";
import { socialSignIn } from "@constants";
import { useTheme } from "@mui/material/styles";
import { HTTP_STATUS } from "@constants/httpStatus.js";
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
import { Divider, Typography, Button, useMediaQuery } from "@mui/material";
//#endregion
//#region redux providers
import {
  SHOW_PROGRESSBAR,
  HIDE_PROGRESSBAR,
} from "@components/mui-ui/progressBar/progressBar.reducer";
import { useDispatch } from "react-redux";
import { REGISTER_USER } from "@reduxproviders/auth.reducer";
import { ROLE_GET_ALL } from "@reduxproviders/role.reducer";
//#endregion
import AnimateButton from "@components/mui-ui/extended/animateButton";
import SocialButtons from "./socialButtons";

const FormSignUp = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [showMessageAlert, setShowMessageAlert] = React.useState(false);
  const [messageContentAlert, setMessageContentAlert] = React.useState();
  const [alertBoxSeverity, setAlertBoxSeverity] = React.useState(
    severity.error
  );
  const [lsRoles, setLsRoles] = React.useState([]);
  const [termsChecked, setTermsChecked] = React.useState(false);
  const [strength, setStrength] = React.useState(0);
  const [level, setLevel] = React.useState();

  //#region getData
  const getRoles = () => {
    helpersExtension.simulateNetworkRequest(100).then(async () => {
      await dispatch(ROLE_GET_ALL())
        .unwrap()
        .then((result) => {
          if (result.ok) {
            setLsRoles(result.rs);
          }
        })
        .catch((error) => {
          // variant could be success, error, warning, info, or default
          enqueueSnackbar(t("connection.error"), {
            variant: severity.error,
          });
        });
    });
  };
  //#endregion

  //#region POST DATA
  const registerUser = async (values) => {
    await dispatch(REGISTER_USER(values))
      .unwrap()
      .then((result) => {
        setSubmitting(false);
        dispatch(HIDE_PROGRESSBAR());

        if (result.code === HTTP_STATUS.OK) {
          if (result.ok) {
            setAlertBoxSeverity(severity.success);
            setShowMessageAlert(true);
            setMessageContentAlert(t("user.registersuccess"));
          } else {
            setAlertBoxSeverity(severity.error);
            setShowMessageAlert(true);
            setMessageContentAlert(
              t("user.registerfail") + ". " + result.message
            );
          }
        } else {
          enqueueSnackbar(result.message, {
            variant: severity.error,
          });
        }

        formik.resetForm();
      })
      .catch((error) => {
        setSubmitting(false);
        dispatch(HIDE_PROGRESSBAR());
        // variant could be success, error, warning, info, or default
        enqueueSnackbar(error, {
          variant: severity.error,
        });
      });
  };
  //#endregion

  // #region useEffect
  React.useEffect(() => {
    // getRoles();
  }, []);
  //#endregion

  //#region useFormik
  const initialValues = _schema.initialValues();
  const validationSchema = _schema.validation();
  const dataForm = _schema.dataForm();
  const [enableValidation, setEnableValidation] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: validationSchema,
    validateOnChange: enableValidation,
    validateOnBlur: enableValidation,
    onSubmit: (values) => {
      setSubmitting(true);
      dispatch(SHOW_PROGRESSBAR());
      helpersExtension.simulateNetworkRequest(100).then(async () => {
        registerUser(values);
      });
    },
  });
  //#endregion

  // #region handle event
  const handleSubmit = (event) => {
    event.preventDefault();
    if (submitting) return;

    setEnableValidation(true);
    formik.handleSubmit();
  };

  const handleInputOnChange = (e, type) => {
    if (type === "password") {
      const temp = strengthIndicator(e.target.value);
      setStrength(temp);
      setLevel(strengthColor(temp));
    }
  };
  //#endregion

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <SocialButtons socialSignIn={socialSignIn} />
        <Grid item xs={12}>
          <Box sx={{ alignItems: "center", display: "flex" }}>
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
              {t("authentication.signupwithemailaddress")}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid item xs={12} container alignItems="center" justifyContent="center">
        <Box
          className="form"
          component="form"
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 1 }}
        >
          <Grid container spacing={matchDownSM ? 0 : 2}>
            {dataForm.map((item, index) => {
              let keyField = item.id + "_" + index;
              let errorText = objectExtension.getValue(
                formik,
                "errors." + item.field
              );
              let hasError =
                Boolean(
                  objectExtension.getValue(formik, "touched." + item.field)
                ) && errorText;
              switch (item.type) {
                case "text":
                case "password":
                  return (
                    <InputField
                      margin="normal"
                      fullWidth
                      key={keyField}
                      id={item.id}
                      type={item.type}
                      tabIndex={item.tabIndex}
                      label={item.label}
                      name={item.field}
                      autoFocus={item.autoFocus}
                      value={objectExtension.getValue(
                        formik,
                        "values." + item.field
                      )}
                      setValue={formik.setFieldValue}
                      onChange={(e) => {
                        formik.handleChange;
                        handleInputOnChange(e, item.type);
                      }}
                      error={hasError}
                      helperText={hasError ? errorText : ""}
                      preventXSS={item.preventXSS}
                      xs={item.xs}
                      sm={item.sm}
                    />
                  );

                case "select":
                  return (
                    <SelectField
                      key={keyField}
                      id={item.id}
                      type={item.type}
                      tabIndex={item.tabIndex}
                      label={item.label}
                      name={item.field}
                      disabled={item.disabled}
                      value={objectExtension.getValue(
                        formik,
                        "values." + item.field
                      )}
                      listItems={item.listItems}
                      setValue={formik.setFieldValue}
                      onChange={formik.handleChange}
                      error={hasError}
                      helperText={hasError ? item.helperText : ""}
                      xs={item.xs}
                      sm={item.sm}
                    />
                  );
              }
            })}
          </Grid>
          <Grid item xs={12}>
            {strength !== 0 && (
              <FormControl fullWidth>
                <Box sx={{ mb: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box
                        style={{ backgroundColor: level?.color }}
                        sx={{ width: 85, height: 8, borderRadius: "7px" }}
                      />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </FormControl>
            )}
          </Grid>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={termsChecked}
                    onChange={(event) => setTermsChecked(event.target.checked)}
                    name="checked"
                  />
                }
                label={
                  <Typography variant="subtitle1">
                    {t("authentication.agreewith")}
                    <Typography
                      variant="subtitle1"
                      component={Link}
                      underline="none"
                      to="#"
                    >
                      {t("authentication.termsandcondition")}
                    </Typography>
                  </Typography>
                }
              />
            </Grid>
            <Grid item xs={12} className={!showMessageAlert ? "none" : ""}>
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
                    severity={alertBoxSeverity}
                  >
                    {messageContentAlert}
                  </Alert>
                </Collapse>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ mt: 2 }}>
                <AnimateButton>
                  <Button
                    disableElevation
                    disabled={submitting || !termsChecked}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    {t("authentication.signup")}
                  </Button>
                </AnimateButton>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </>
  );
};

export default FormSignUp;
