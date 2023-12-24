import * as React from "react";
//#region utils support
import { useTranslation } from "react-i18next";
import { hook } from "@utils/crossCutting";
//#endregion

// material-ui
import { Box, Card, Grid } from "@mui/material";

//#region components
import AuthChangePassword from "@authentication/changepassword";
//#endregion

const ChangePassword = (props) => {
  const { t } = useTranslation();

  return <AuthChangePassword />;
};

export default ChangePassword;
