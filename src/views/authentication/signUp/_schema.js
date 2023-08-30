import { useTranslation } from "react-i18next";
import { ROLE } from "@constants/enumRoles";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { isUserState, isVisitorState } from "@reduxproviders/auth.reducer";

export default {
  initialValues: () => {
    return {
      detailInfos: {
        firstName: "",
        lastName: "",
        avatarPath: "",
      },
      role: ROLE.USER.name,
      username: "",
      password: "",
    };
  },
  validation: () => {
    const { t } = useTranslation();
    return yup.object({
      detailInfos: yup.object().shape({
        firstName: yup.string().required(t("authentication.enterfirstname")),
        lastName: yup.string().required(t("authentication.enterlastname")),
      }),
      username: yup
        .string()
        .email(t("authentication.mustbeavalidemail"))
        .max(255)
        .required(t("authentication.enterusername")),
      password: yup
        .string()
        .required(t("authentication.enterpassword"))
        .min(8, t("authentication.passwordmusgreater8")),
      // different error messages for different requirements
      // .matches(/[0-9]/, getCharacterValidationError("digit"))
      // .matches(/[a-z]/, getCharacterValidationError("lowercase"))
      // .matches(/[A-Z]/, getCharacterValidationError("uppercase")),
      // confirmPassword: yup
      //   .string()
      //   .required(t("authentication.retypeyourpasswrod"))
      //   .oneOf([yup.ref("password"), null], t("authentication.passworddoesnotmatch")),
    });
  },
  dataForm: () => {
    const { t } = useTranslation();
    const isVisitor = useSelector(isVisitorState);
    const isUser = useSelector(isUserState);
    // render firstname
    const firstname = {
      tabIndex: 0,
      id: "detailInfos.firstName",
      field: "detailInfos.firstName",
      type: "text",
      label: t("authentication.firstname"),
      autoFocus: true,
      preventXSS: true,
      helperText: t("authentication.enterfirstname"),
      xs: 12,
      sm: 6,
    };

    // render lastname
    const lastname = {
      tabIndex: 1,
      id: "detailInfos.lastName",
      field: "detailInfos.lastName",
      type: "text",
      label: t("authentication.lastname"),
      preventXSS: true,
      helperText: t("authentication.enterlastname"),
      xs: 12,
      sm: 6,
    };

    // render role
    // const role = {
    //   tabIndex: 2,
    //   id: "role",
    //   field: "role",
    //   type: "select",
    //   label: t("authentication.rolename"),
    //   listItems: lsRoles.map((x) => {
    //     return {
    //       _id: x.lowercase,
    //       name: x.name,
    //     };
    //   }),
    //   preventXSS: true,
    //   disabled: isVisitor || isUser,
    //   helperText: t("authentication.selectrole"),
    // };

    // render username
    const username = {
      tabIndex: 3,
      id: "username",
      field: "username",
      type: "text",
      label: t("authentication.username"),
      helperText: t("authentication.enterusername"),
    };

    // render password
    const password = {
      tabIndex: 4,
      id: "password",
      field: "password",
      type: "password",
      label: t("authentication.password"),
      helperText: t("authentication.enterpassword"),
    };

    // push all to array
    let inputForms = [];
    inputForms.push(firstname);
    inputForms.push(lastname);
    // inputForms.push(role);
    inputForms.push(username);
    inputForms.push(password);

    //sort fields by index
    inputForms.sort((a, b) => (a.tabIndex > b.tabIndex ? 1 : -1));
    return inputForms;
  },
};
