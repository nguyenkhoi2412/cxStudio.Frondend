import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { crossCutting, object } from "@utils/crossCutting";
import { getYupSchemaFromMetaData } from "@utils/yupSchemaCreator";
import { useSnackbar } from "notistack";
import { socialSignIn } from "@constants";
import { HTTP_STATUS } from "@constants/httpStatus";
import InputField from "@components/mui-ui/forms/inputField";
import _schema from "./../signIn/_schema";
import { useTheme } from "@mui/material/styles";
import { navigateLocation } from "@routes/navigateLocation";
import WpAlert from "@components/mui-ui/alert";
//#region mui-ui
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
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
import { useDispatch } from "react-redux";
import { VALIDATE_USER } from "@reduxproviders/auth.reducer";
//#endregion
import AnimateButton from "@components/mui-ui/extended/animateButton";
import SocialButtons from "./socialButtons";

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
    crossCutting.simulateNetworkRequest(100).then(async () => {
      await dispatch(VALIDATE_USER(values))
        .unwrap()
        .then((response) => {
          setSubmitting(false);
          responseValidate(response);

          formik.resetForm();
        })
        .catch((error) => {
          setSubmitting(false);
          formik.resetForm();
        });
    });
  };

  const responseValidate = (response) => {
    if (response.code === HTTP_STATUS.OK) {
      if (response.ok) {
        if (response.rs.verified_token) {
          navigate(navigateLocation.CLIENT_APP.APP);
        } else {
          //* verify 2FA
          navigate(navigateLocation.AUTH.CODE_VERIFICATION);
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
        <SocialButtons socialSignIn={socialSignIn} />
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
              const errorText = object.getValue(
                formik,
                "errors." + item.field
              );
              let hasError =
                Boolean(
                  object.getValue(formik, "touched." + item.field)
                ) && errorText;
              let dataValue = object.getValue(
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
                href={navigateLocation.AUTH.FORGOT_PASSWORD}
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
