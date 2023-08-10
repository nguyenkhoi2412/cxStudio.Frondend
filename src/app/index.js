import "./app.scss";
import React from "react";
import { useTranslation } from "react-i18next";
import defaultFavicon from "@assets/favicons/default/favicon.svg";
import vars from "@constants/variables";
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

import { helpersExtension } from "@utils/helpersExtension";
import { useDispatch, useSelector } from "react-redux";
import {
  SHOW_SPIN,
  HIDE_SPIN,
} from "@components/mui-ui/backdropSpin/backdropSpin.reducer";

//#region call api
import { SITE_GET_BY_ID, siteState } from "@reduxproviders/site.reducer";
//#endregion

const App = (props) => {
  console.warn = () => {};
  addFavicons();
  const customization = useSelector((state) => state.customization);
  const siteDatas = useSelector(siteState);
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

  //#region get datas
  const getSiteInfosById = () => {
    dispatch(
      SITE_GET_BY_ID(vars.SITE_ID)
    );
  };
  //#endregion

  //#region useEffect
  React.useEffect(() => {
    i18n.changeLanguage("en-US");
    handleResize();

    //* GET SITE INFO
    getSiteInfosById();

    dispatch(
      SHOW_SPIN({
        type: "pre",
      })
    );
    // preload
    const timer = setTimeout(() => {
      upadateLoad(false);
      dispatch(HIDE_SPIN());
    }, 600);

    return () => clearTimeout(timer);
  }, []);
  //#endregion

  //#region handle events
  const handleResize = helpersExtension.debounce(() => {
    setDeviceInfos(helpersExtension.detectEnvironment());
  }, 10);

  //* window resize
  $(window)
    .off("resize.handleResize")
    .on("resize.handleResize", function () {
      handleResize();
    });
  //#endregion

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
