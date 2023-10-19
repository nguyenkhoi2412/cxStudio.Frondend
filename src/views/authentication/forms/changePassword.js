import * as React from "react";
//#region hooks, utils support
import { useTranslation, Trans } from "react-i18next";
import { useFormik } from "formik";
import { helpersExtension, objectExtension } from "@utils/helpersExtension";
import { useSnackbar } from "notistack";
import InputField from "@components/forms/inputField";
import { HTTP_STATUS } from "@constants/httpStatus";
import _schema from "../changePassword/_schema";
//#endregion
//#region mui-ui
import FormControl from "@mui/material/FormControl";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import severity from "@constants/severity";
import { Button } from "@mui/material";
//#endregion
//#region redux providers
import {
  SHOW_PROGRESSBAR,
  HIDE_PROGRESSBAR,
} from "@components/mui-ui/progressBar/progressBar.reducer";
import { useDispatch } from "react-redux";
import {
  CHANGE_PASSWORD,
} from "@reduxproviders/auth.reducer";
//#endregion
import AnimateButton from "@components/mui-ui/extended/animateButton";

const FormChangePassword = () => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [showMessageAlert, setShowMessageAlert] = React.useState(false);
  const [messageContentAlert, setMessageContentAlert] = React.useState();
  const [statusMessage, setStatusMessage] = React.useState(severity.success);

  //#region call API process
  const changePassword = (values) => {
    helpersExtension.simulateNetworkRequest(100).then(async () => {
      await dispatch(CHANGE_PASSWORD(values))
        .unwrap()
        .then((result) => {
          setSubmitting(false);
          dispatch(HIDE_PROGRESSBAR());

          if (result.code === HTTP_STATUS.OK) {
            if (result.ok) {
              setStatusMessage(severity.success);
              setShowMessageAlert(true);
              setMessageContentAlert(t("user.changepasswordsuccess"));
            } else {
              setStatusMessage(severity.error);
              setShowMessageAlert(true);
              setMessageContentAlert(t("authentication.wrong_credential"));
            }
          } else {
            enqueueSnackbar(result.message, {
              variant: severity.error,
            });
          }

          formik.resetForm();
        })
        .catch((error) => {
          dispatch(HIDE_PROGRESSBAR());
          // variant could be success, error, warning, info, or default
          enqueueSnackbar(error, {
            variant: severity.error,
          });
          formik.resetForm();
        });
    });
  };
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
      changePassword(values);
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
              let dataValue =
                objectExtension.getValue(formik, "values." + item.field) || "";
              return (
                <InputField
                  margin="normal"
                  fullWidth
                  disabled={item.disabled}
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
                  severity={statusMessage}
                >
                  {messageContentAlert}
                </Alert>
              </Collapse>
            </FormControl>
            <AnimateButton>
              <Button
                disableElevation
                disabled={submitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                {t("user.changepassword")}
              </Button>
            </AnimateButton>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default FormChangePassword;
