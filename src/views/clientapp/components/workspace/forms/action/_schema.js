import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import _globalVars from "@constants/variables";
import { helpersExtension } from "@utils/helpersExtension";
import * as yup from "yup";

const { locale } = _globalVars;

export default {
  initialValues: (data) => {
    const siteData = useSelector((state) => state.site);
    let objData = {};

    if (helpersExtension.isNotNull(data)) {
      objData = {
        ...data,
      };
    } else {
      objData = {
        site_id: siteData.d._id,
        name: {
          [locale.lang]: "",
        },
        company: {
          [locale.lang]: "",
        },
        logo_path: "",
        currentuser_id: "",
        is_active: true,
      };
    }

    return objData;
  },
  validation: () => {
    const { t } = useTranslation();

    const objSchema = {
      name: yup.object().shape({
        [locale.lang]: yup.string().required(t("validate.required")),
      }),
      company: yup.object().shape({
        [locale.lang]: yup.string().required(t("validate.required")),
      }),
    };

    return yup.object().shape(objSchema);
  },
  dataForm: () => {
    const { t } = useTranslation();

    // render name
    const name = {
      tabIndex: 0,
      id: "name",
      field: "name." + locale.lang,
      type: "text",
      label: t("workspace.name"),
      autoFocus: true,
      preventXSS: true,
      helperText: t("workspace.enter_workspace_name"),
    };

    // render company
    const company = {
      tabIndex: 1,
      id: "company",
      field: "company." + locale.lang,
      type: "text",
      label: t("workspace.w_is_your_company"),
      autoFocus: true,
      preventXSS: true,
      helperText: t("workspace.enter_your_company"),
    };

    // push all to array
    let inputForms = [];
    inputForms.push(name);
    inputForms.push(company);

    //sort fields by index
    inputForms.sort((a, b) => (a.tabIndex > b.tabIndex ? 1 : -1));
    return inputForms;
  },
};
