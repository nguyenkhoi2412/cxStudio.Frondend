import "./_action.scss";
import React from "react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import _globalVars from "@constants/variables";
import { helpersExtension, objectExtension } from "@utils/helpersExtension.js";
import { getYupSchemaFromMetaData } from "@utils/yupSchemaCreator";
import { useSnackbar } from "notistack";
import { gridSpacing } from "@constants";
import { HTTP_STATUS } from "@constants/httpStatus";
import InputField from "@components/forms/inputField";
import { useTheme } from "@mui/material/styles";
import { navigateLocation } from "@routes/navigateLocation";
import AnimateButton from "@components/mui-ui/extended/animateButton";

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
import { useSelector } from "react-redux";
import _schema from "./_schema";

const FormAction = () => {
  const { t } = useTranslation();
  const { locale } = _globalVars;

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
      console.log("values", values);
      // setSubmitting(true);
      // helpersExtension.simulateNetworkRequest(100).then(async () => {
      //   registerUser(values);
      // });
    },
  });
  //#endregion

  // #region handle event
  const handleSubmit = (event) => {
    event.preventDefault();
    // if (submitting) return;

    setEnableValidation(true);
    formik.handleSubmit();
  };
  //#endregion
  return (
    <>
      <Box
        className="form"
        component="form"
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
        sx={{
          alignItems: "center",
          display: "flex",
        }}
      >
        <Grid container>
          <Grid item className="desc" textAlign={"left"}>
            <Typography variant="h2" gutterBottom>
              {t("workspace.let_get_started")}
            </Typography>
            <Typography component={"p"} variant="body1" gutterBottom>
              {t("workspace.only_take_a_few_minutes_to_setup_workspace")}
            </Typography>
            <Typography component={"p"} variant="body1" gutterBottom>
              {t("workspace.mode_workspace_can_expand_more")}
            </Typography>
          </Grid>
          {/* Build form create new workspace */}
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
                    onChange={formik.handleChange}
                    error={hasError}
                    helperText={hasError ? errorText : ""}
                    preventXSS={item.preventXSS}
                    xs={item.xs}
                    sm={item.sm}
                  />
                );
            }
          })}
          <Grid item xs={12}>
            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button
                  disableElevation
                  disabled={submitting}
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  {t("workspace.btn_create_new_workspace")}
                </Button>
              </AnimateButton>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default FormAction;

// export default React.memo(SignUp, (props, nextProps) => {
//   if (props === nextProps) {
//     // return true if you don't need re-render
//     return true;
//   }
// });
