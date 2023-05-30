import React from "react";
import { useTranslation } from "react-i18next";
import defaultFavicon from "@assets/favicons/default/favicon.png";

import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@mui/system";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { configBaseTheme } from "@assets/themesMui-ui/_baseTheme";
//#region useHooks,components, helper
import IncBackdrop from "@components/mui-ui/backdropSpin";
import IncProgressBar from "@components/mui-ui/progressBar";
//#endregion
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const MainLayoutProviders = ({ children, ...other }) => {
  addFavicons();
  const customization = useSelector((state) => state.customization);

  return (
    // <StyledEngineProvider injectFirst>
    //   <ThemeProvider theme={configBaseTheme(customization)}>
    //     <CssBaseline />

    //     <IncProgressBar />
    //     <IncBackdrop />
    //     <SnackbarProvider
    //       maxSnack={3}
    //       autoHideDuration={3000}
    //       anchorOrigin={{
    //         vertical: "bottom",
    //         horizontal: "right",
    //       }}
    //     >
    <Box sx={{ display: "flex" }}>
      {/* <Grid
            container
            component="main"
            direction="column"
            sx={{ minHeight: "100vh", height: "100%", width: "100%" }}
          > */}
      {children}
    </Box>
  );
};

export default MainLayoutProviders;

const addFavicons = () => {
  var link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "shortcut icon";
    document.getElementsByTagName("head")[0].appendChild(link);
  }
  link.href = defaultFavicon;
};
