import { useTranslation } from "react-i18next";
import * as yup from "yup";

export default {
  initialValues: (itemValue) => {
    return {
      id: itemValue?.id,
      task: itemValue?.task,
      desc: itemValue?.desc,
    };
  },
  validation: () => {
    const { t } = useTranslation();
    return yup.object({
      task: yup.string().required("Vui lòng nhập tiêu đề"),
      desc: yup.string().required("Vui lòng thêm mô tả"),
    });
  },
  dataForm: () => {
    const { t } = useTranslation();

    // render task
    const task = {
      tabIndex: 0,
      id: "task",
      field: "task",
      type: "text",
      label: "Tiêu đề",
      autoFocus: true,
      preventXSS: true,
      helperText: "Nhập tiêu đề",
      xs: 12,
      sm: 12,
    };

    // render desc
    const desc = {
      tabIndex: 2,
      id: "desc",
      field: "desc",
      type: "text",
      label: "Mô tả",
      autoFocus: true,
      preventXSS: true,
      helperText: "Nhập Mô tả",
      xs: 12,
      sm: 12,
    };

    // push all to array
    let inputForms = [];
    inputForms.push(task);
    inputForms.push(desc);

    //sort fields by index
    inputForms.sort((a, b) => (a.tabIndex > b.tabIndex ? 1 : -1));
    return inputForms;
  },
};
