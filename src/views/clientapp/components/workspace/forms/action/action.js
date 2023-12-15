import "./_action.scss";
import _schema from "./_schema";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import _globalVars from "@constants/variables";
import { helpersExtension, objectExtension } from "@utils/helpersExtension.js";
import { getYupSchemaFromMetaData } from "@utils/yupSchemaCreator";
import { useSnackbar } from "notistack";
import { gridSpacing } from "@constants";
import { HTTP_STATUS } from "@constants/httpStatus";
import InputField from "@components/mui-ui/forms/inputField";
import { useTheme } from "@mui/material/styles";
import { navigateLocation } from "@routes/navigateLocation";
import AnimateButton from "@components/mui-ui/extended/animateButton";
import UploadFile from "@components/mui-ui/forms/uploadFile/uploadFile";

//#region mui-ui
import { Box, Typography, Button, Grid } from "@mui/material";
//#endregion
import { useDispatch, useSelector } from "react-redux";
import { INSERT_NEW } from "@reduxproviders/workspace.reducer";

const FormAction = () => {
  const { t } = useTranslation();
  const { locale } = _globalVars;
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const uploadFileRef = React.useRef();

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
      uploadFileRef.current.handleUploadFiles().then((rs) => {
        if (rs?.filenames?.length > 0) {
          values.logo_path = rs.filenames[0];
        }
        values.currentuser_id = currentUser._id;
        dispatch(INSERT_NEW(values))
          .unwrap()
          .then((result) => {
            setSubmitting(false);
            formik.resetForm();
          })
          .catch(() => {
            setSubmitting(false);
            formik.resetForm();
          });
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
            <UploadFile
              ref={uploadFileRef}
              type="single"
              identifyFolder={currentUser._id}
              hideUploadFileButton={true}
            />
          </Grid>
          <Grid item xs={12} className="btns-action">
            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button
                  disableElevation
                  fullWidth
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
