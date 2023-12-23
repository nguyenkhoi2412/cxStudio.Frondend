import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import _globalVars from "@constants/variables";
import { crossCutting, string } from "@utils/crossCutting";
import * as yup from "yup";

const { locale } = _globalVars;

export default {
  initialValues: (data) => {
    const siteData = useSelector((state) => state.site);

    let objData = {};

    if (crossCutting.check.isNotNull(data)) {
      objData = {
        ...data,
      };
    } else {
      objData = {
        site_id: siteData.d?._id,
        name: {
          [locale.lang]: "",
        },
        company: {
          [locale.lang]: "",
        },
        industry_related: "",
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
  dataForm: (industries) => {
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

    // render industry_related
    const industry_related = {
      tabIndex: 2,
      id: "industry_related",
      field: "industry_related",
      type: "select",
      label: t("workspace.industry_related"),
      listItems: industries.map((x) => {
        return {
          _id: x._id,
          name: string.render(x.name),
        };
      }),
      preventXSS: true,
      helperText: t("workspace.select_industry_related"),
    };

    // push all to array
    let inputForms = [];
    inputForms.push(name);
    inputForms.push(company);
    inputForms.push(industry_related);

    //sort fields by index
    inputForms.sort((a, b) => (a.tabIndex > b.tabIndex ? 1 : -1));
    return inputForms;
  },
};
