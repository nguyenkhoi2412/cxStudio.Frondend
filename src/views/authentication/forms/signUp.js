import * as React from "react";
import { useTranslation, Trans } from "react-i18next";
import { useFormik } from "formik";
import { Helpers, objectExtension, hooksInstance } from "@utils/helpers";
import { strengthColor, strengthIndicator } from "@utils/passwordStrength";
import { getYupSchemaFromMetaData } from "@utils/yupSchemaCreator.js";
import { useSnackbar } from "notistack";
import InputField from "@components/forms/inputField";
import SelectField from "@components/forms/selectField";
import _schema from "./../signUp/_schema";
import Google from "@assets/images/icons/social-google.svg";
import { useTheme } from "@mui/material/styles";
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
import { useDispatch, useSelector } from "react-redux";
import {
  REGISTER_USER,
  userState,
  currentUserState,
} from "@reduxproviders/user.reducer";
import { ROLE_GET_ALL, roleState } from "@reduxproviders/role.reducer";
//#endregion
import AnimateButton from "@components/mui-ui/extended/animateButton";

const FormSignUp = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const { t } = useTranslation();

  const dataRoleValues = useSelector(roleState);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [showMessageAlert, setShowMessageAlert] = React.useState(false);
  const [messageContentAlert, setMessageContentAlert] = React.useState();
  const [alertBoxSeverity, setAlertBoxSeverity] = React.useState(
    severity.error
  );
  const dataValues = useSelector(userState);
  const [lsRoles, setLsRoles] = React.useState([]);
  const [checked, setChecked] = React.useState(true);
  const [strength, setStrength] = React.useState(0);
  const [level, setLevel] = React.useState();

  //#region getData
  const getRoles = () => {
    Helpers.simulateNetworkRequest(100).then(async () => {
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
        if (result.ok) {
          setAlertBoxSeverity(severity.success);
          setShowMessageAlert(true);
          setMessageContentAlert(t("authentication.registersuccess"));
        } else {
          setAlertBoxSeverity(severity.error);
          setShowMessageAlert(true);
          setMessageContentAlert(
            t("authentication.registerfail") + ". " + result.message
          );
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
    getRoles();
  }, []);
  //#endregion

  //#region useFormik
  const initialValues = _schema.initialValues();
  const validationSchema = _schema.validation();
  const dataForm = _schema.dataForm(lsRoles);
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
      Helpers.simulateNetworkRequest(100).then(async () => {
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
        <Grid item xs={12}>
          <AnimateButton>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => console.log("googleHandler")}
              size="large"
              sx={{
                color: "grey.700",
                backgroundColor: theme.palette.grey[50],
                borderColor: theme.palette.grey[100],
              }}
            >
              <Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
                <img
                  src={Google}
                  alt="google"
                  width={16}
                  height={16}
                  style={{ marginRight: matchDownSM ? 8 : 16 }}
                />
              </Box>
              {t("authentication.signupwithgoogle")}
            </Button>
          </AnimateButton>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ alignItems: "center", display: "flex" }}>
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
            <Button
              variant="outlined"
              sx={{
                cursor: "unset",
                m: 2,
                py: 0.5,
                px: 7,
                borderColor: `${theme.palette.grey[100]} !important`,
                color: `${theme.palette.grey[900]}!important`,
                fontWeight: 500,
              }}
              disableRipple
              disabled
            >
              {t("authentication.or")}
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
              let errorText = objectExtension.getValue(formik, "errors." + item.field)
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
                    checked={checked}
                    onChange={(event) => setChecked(event.target.checked)}
                    name="checked"
                    color="primary"
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
                    disabled={submitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="secondary"
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
