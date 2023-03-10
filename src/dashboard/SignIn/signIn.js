import "./_signIn.scss";
import * as React from "react";
import { useTranslation, Trans } from "react-i18next";
import { useFormik } from "formik";
import { Helpers, objectExtension, hooksInstance } from "@utils/helpers";
import { getYupSchemaFromMetaData } from "@utils/yupSchemaCreator.js";
import InputField from "@components/forms/inputField";
import _schema from "./_schema";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { data } from "jquery";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        MUI
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const SignIn = () => {
  const { t } = useTranslation();
  const initialValues = _schema.initialValues();
  // const validationSchema = _schema.validation();
  const dataForm = _schema.dataForm();
  //#region useFormik
  const [enableValidation, setEnableValidation] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: getYupSchemaFromMetaData(dataForm),
    validateOnChange: enableValidation,
    validateOnBlur: enableValidation,
    onSubmit: (values) => {
      console.log("values", values);
      // setSubmitting(true);
      // dispatch(
      //   SHOW_LOADING({ overlay: true, text: t('common.validating') + '...' })
      // );

      // Helpers.simulateNetworkRequest(100).then(() => {
      //   dispatch(VALIDATE_USER(values));
      // });
    },
  });
  //#endregion

  //#region handle event
  const handleSubmit = (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
    setEnableValidation(true);
    formik.handleSubmit();
  };
  //#endregion

  return (
    <>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{ m: 1, bgcolor: "secondary.main", width: 120, height: 120 }}
              src="https://lh3.googleusercontent.com/ogw/ADea4I42Wp7xjKidQJ_PbgllDbo3oH_47xQ76TfzLRQssw=s192-c-mo"
            ></Avatar>
            <Typography component="h1" variant="h5">
              {t("authentication.signin")}
            </Typography>
            <Box
              className="form"
              component="form"
              autoComplete="off"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              {dataForm.map((item, index) => {
                let hasError =
                  Boolean(
                    objectExtension.getValue(formik, "touched." + item.field)
                  ) && objectExtension.getValue(formik, "errors." + item.field);
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
                    value={objectExtension.getValue(
                      formik,
                      "values." + item.field
                    )}
                    onChange={formik?.handleChange}
                    error={hasError}
                    helperText={hasError ? item.helperText : ""}
                  />
                );
              })}
              <FormControl fullWidth>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label={t("authentication.rememberme")}
                />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {t("authentication.signin")}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    {t("authentication.forgotpassword")}
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {t("authentication.donthaveanaccount")}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default SignIn;
