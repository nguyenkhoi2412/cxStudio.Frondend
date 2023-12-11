import "./_action.scss";
import React from "react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { helpersExtension, objectExtension } from "@utils/helpersExtension.js";
import { getYupSchemaFromMetaData } from "@utils/yupSchemaCreator";
import { useSnackbar } from "notistack";
import { gridSpacing } from "@constants";
import { HTTP_STATUS } from "@constants/httpStatus";
import InputField from "@components/forms/inputField";
import { useTheme } from "@mui/material/styles";
import { navigateLocation } from "@routes/navigateLocation";

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

const FormAction = () => {
  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        spacing={gridSpacing}
      >
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
          }}
        >
          <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
        </Box>
      </Grid>
    </>
  );
};

export default FormAction;
