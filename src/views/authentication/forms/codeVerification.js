import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { crossCutting } from "@utils/crossCutting";
import { objectHelper } from "@utils/object.helper";
import { getYupSchemaFromMetaData } from "@utils/yupSchemaCreator";
import { useSnackbar } from "notistack";
import InputField from "@components/mui-ui/forms/inputField";
import _schema from "../codeVerification/_schema";
import { navigateLocation } from "@routes/navigateLocation";
import { HTTP_STATUS } from "@constants/httpStatus";
//#region mui-ui
import FormControl from "@mui/material/FormControl";
import WpAlert from "@components/mui-ui/alert";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import severity from "@constants/severity";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
//#endregion
//#region redux providers
import { useDispatch, useSelector } from "react-redux";
//#endregion
import AnimateButton from "@components/mui-ui/extended/animateButton";
import {
  VALIDATE_SECURE_2FA,
  currentUserState,
} from "@reduxproviders/auth.reducer";

const FormCodeVerification = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const currentUser = useSelector(currentUserState);
  const dispatch = useDispatch();
  const [showMessageAlert, setShowMessageAlert] = React.useState(false);
  const [messageContentAlert, setMessageContentAlert] = React.useState();

  const validateSecure2FA = (values) => {
    crossCutting.simulateNetworkRequest(100).then(async () => {
      //? validate token
      await dispatch(
        VALIDATE_SECURE_2FA({
          id: currentUser._id,
          code: values.code_verify,
        })
      )
        .unwrap()
        .then((result) => {
          setSubmitting(false);

          if (result.code === HTTP_STATUS.OK) {
            if (result.ok) {
              navigate(navigateLocation.CLIENT_APP.APP);
            } else {
              setShowMessageAlert(true);
              setMessageContentAlert(result.message);
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
          formik.resetForm();
        });
    });
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
      validateSecure2FA(values);
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
              const errorText = objectHelper.getValue(
                formik,
                "errors." + item.field
              );
              let hasError =
                Boolean(
                  objectHelper.getValue(formik, "touched." + item.field)
                ) && errorText;
              let dataValue = objectHelper.getValue(
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
            <WpAlert
              open={showMessageAlert}
              message={messageContentAlert}
              close={() => setShowMessageAlert(false)}
            />
            <AnimateButton>
              <Button
                disableElevation
                disabled={submitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                {t("authentication.continue")}
              </Button>
            </AnimateButton>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default FormCodeVerification;
