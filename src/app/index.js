import "./app.scss";
import React from "react";
import { useTranslation } from "react-i18next";
import defaultFavicon from "@assets/favicons/default/favicon.svg";

import { BuildRoutes } from "@routes";
// import { hookInstance } from "@utils/hookInstance";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@mui/system";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { configBaseTheme } from "@theme/_base";
import NavigationScroll from "@utils/_layout/navigationScroll";
import { BrowserRouter } from "react-router-dom";
import IncBackdrop from "@components/mui-ui/backdropSpin";
import IncProgressBar from "@components/mui-ui/progressBar";
//#endregion
import { helpersExtension } from "@utils/helpersExtension";
import { useDispatch, useSelector } from "react-redux";
import {
  SHOW_SPIN,
  HIDE_SPIN,
} from "@components/mui-ui/backdropSpin/backdropSpin.reducer";

const App = (props) => {
  console.warn = () => {};
  addFavicons();
  const customization = useSelector((state) => state.customization);
  const dispatch = useDispatch();

  document.body.classList.toggle("darkTheme", customization.mode === "dark");
  document.body.classList.toggle(
    "defaultTheme",
    customization.mode === "light"
  );
  const { i18n } = useTranslation();
  const [load, upadateLoad] = React.useState(true);
  const [deviceInfos, setDeviceInfos] = React.useState({
    mobile: false,
    responsive: false,
  });

  const handleResize = helpersExtension.debounce(() => {
    setDeviceInfos(helpersExtension.detectEnvironment());
  }, 10);

  //#region useEffect
  //* GET SITE INFO
  React.useEffect(() => {
    i18n.changeLanguage("en-US");
    handleResize();

    dispatch(SHOW_SPIN({
      type: "pre"
    }));
    // preload
    const timer = setTimeout(() => {
      upadateLoad(false);
      dispatch(HIDE_SPIN());
    }, 600);

    return () => clearTimeout(timer);
  }, []);
  //#endregion

  //* window resize
  $(window)
    .off("resize.handleResize")
    .on("resize.handleResize", function () {
      handleResize();
    });

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={configBaseTheme(customization)}>
        <CssBaseline />

        <IncProgressBar />
        <IncBackdrop />
        <SnackbarProvider
          maxSnack={3}
          autoHideDuration={3000}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          <BrowserRouter>
            <NavigationScroll>
              {load ? <></> : <BuildRoutes />}
            </NavigationScroll>
          </BrowserRouter>
        </SnackbarProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;

const addFavicons = () => {
  var link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "shortcut icon";
    document.getElementsByTagName("head")[0].appendChild(link);
  }
  link.href = defaultFavicon;
};
