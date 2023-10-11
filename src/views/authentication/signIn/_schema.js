import { useTranslation } from "react-i18next";
import * as yup from "yup";

export default {
  initialValues: () => {
    return {
      username: process.env.DASHBOARD_USER_LOGIN || "",
      password: process.env.DASHBOARD_USER_PASSWORD || "",
    };
  },
  validation: () => {
    const { t } = useTranslation();
    return yup.object({
      username: yup
        .string()
        .email(t("authentication.mustbeavalidemail"))
        .required(t("authentication.enterusername")),
      password: yup.string().required(t("authentication.enterpassword")),
    });
  },
  dataForm: () => {
    const { t } = useTranslation();

    // render username
    const username = {
      tabIndex: 0,
      id: "username",
      field: "username",
      type: "text",
      label: t("authentication.username"),
      autoFocus: true,
      helperText: t("authentication.enterusername"),
    };
    username.validations = yup
      .string()
      .required(t("authentication.enterusername"));

    // render password
    const password = {
      tabIndex: 1,
      id: "password",
      field: "password",
      type: "password",
      label: t("authentication.password"),
      helperText: t("authentication.enterpassword"),
    };
    password.validations = yup
      .string()
      .required(t("authentication.enterpassword"));

    // push all to array
    let inputForms = [];
    inputForms.push(username);
    inputForms.push(password);

    //sort fields by index
    inputForms.sort((a, b) => (a.tabIndex > b.tabIndex ? 1 : -1));
    return inputForms;
  },
};
