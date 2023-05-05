import * as React from "react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { helpersExtension, objectExtension } from "@utils/helpersExtension";
import { useSnackbar } from "notistack";
import InputField from "@components/forms/inputField";
import SelectField from "@components/forms/selectField";
import _schema from "./_schema";
import { useTheme } from "@mui/material/styles";
//#region mui-ui
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import severity from "@constants/severity";
import { Button, useMediaQuery } from "@mui/material";
//#endregion
//#region redux providers
import {
  SHOW_PROGRESSBAR,
  HIDE_PROGRESSBAR,
} from "@components/mui-ui/progressBar/progressBar.reducer";
import { useDispatch } from "react-redux";
import { GET_COUNTRIES } from "@reduxproviders/country.reducer";
import { ROLE_GET_ALL } from "@reduxproviders/role.reducer";
import { USER_UPDATE_INFO } from "@reduxproviders/auth.reducer";
//#endregion
import AnimateButton from "@components/mui-ui/extended/animateButton";

const FormAccountDetailInfo = (props) => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [currentUser, setCurrentUser] = React.useState();
  const [showMessageAlert, setShowMessageAlert] = React.useState(false);
  const [messageContentAlert, setMessageContentAlert] = React.useState();
  const [alertBoxSeverity, setAlertBoxSeverity] = React.useState(
    severity.error
  );
  const [lsRoles, setLsRoles] = React.useState([]);
  const [lsCountry, setLsCountry] = React.useState([]);
  const [twoFactorChecked, setTwoFactorChecked] = React.useState(true);

  //#region usEffect
  React.useEffect(() => {
    setCurrentUser(props.currentUser);
    setTwoFactorChecked(props.currentUser.oneTimePassword);
  }, []);
  // #endregion

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

  const getCountries = () => {
    helpersExtension.simulateNetworkRequest(100).then(async () => {
      await dispatch(GET_COUNTRIES())
        .unwrap()
        .then((result) => {
          setLsCountry(result);
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
  const editUser = async (values) => {
    //! update 2fa values
    values.oneTimePassword = twoFactorChecked;
    // compare 2 object get diff for update
    values = objectExtension.getDiff(values, currentUser);
    values._id = currentUser._id;
    await dispatch(USER_UPDATE_INFO(values))
      .unwrap()
      .then((result) => {
        setSubmitting(false);
        dispatch(HIDE_PROGRESSBAR());
        if (result.ok) {
          setAlertBoxSeverity(severity.success);
          setShowMessageAlert(true);
          setMessageContentAlert(t("user.updatesuccess"));
        } else {
          setAlertBoxSeverity(severity.error);
          setShowMessageAlert(true);
          setMessageContentAlert(t("user.updatefail") + ". " + result.message);
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
    getCountries();
  }, []);
  //#endregion

  //#region useFormik
  const initialValues = _schema.initialValues();
  const validationSchema = _schema.validation();
  const dataForm = _schema.dataForm(lsRoles, lsCountry);
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
        editUser(values);
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

  const handleChangeOneTimePassword = (e) => {
    setTwoFactorChecked(e.target.checked);
  };
  //#endregion

  //#region render content
  const renderOneTimePasswordField = (item) => {
    return (
      <Grid item xs={12} className="field-container">
        <FormControl margin="normal" fullWidth>
          <FormControlLabel
            value="start"
            control={
              <Switch
                defaultChecked={item.isOneTimePassword}
                onChange={handleChangeOneTimePassword}
              />
            }
            label={item.label}
            labelPlacement="start"
          />
        </FormControl>
      </Grid>
    );
  };
  //#endregion

  return (
    <React.Fragment>
      <Grid item xs={12} container alignItems="center" justifyContent="center">
        <Box
          className="form account-detail-infos"
          component="form"
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 1 }}
        >
          <Grid container spacing={2}>
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
                case "number":
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
                      autoComplete={item.autoComplete}
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

                default:
                  switch (item.field) {
                    case "oneTimePassword":
                      return (
                        <React.Fragment key={keyField}>
                          {renderOneTimePasswordField(item)}
                        </React.Fragment>
                      );
                  }
              }
            })}
          </Grid>
          <Grid container alignItems="center" justifyContent="space-between">
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
            <Grid item>
              <Box className="btn-actions">
                <AnimateButton>
                  <Button
                    disableElevation
                    disabled={submitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    {t("user.changedetail")}
                  </Button>
                </AnimateButton>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </React.Fragment>
  );
};

export default FormAccountDetailInfo;
