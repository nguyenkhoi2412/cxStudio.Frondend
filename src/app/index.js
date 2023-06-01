import "./app.scss";
import React from "react";
import { useTranslation } from "react-i18next";
import defaultFavicon from "@assets/favicons/default/favicon.png";

import { BuildRoutes } from "@routes";
// import { hookInstance } from "@utils/hookInstance";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@mui/system";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { configBaseTheme } from "@assets/themesMui-ui/_baseTheme";
import NavigationScroll from "@utils/_layout/navigationScroll";
import { BrowserRouter } from "react-router-dom";
import IncBackdrop from "@components/mui-ui/backdropSpin";
import IncProgressBar from "@components/mui-ui/progressBar";
//#endregion
import { helpersExtension } from "@utils/helpersExtension";
import { useSelector } from "react-redux";

const App = (props) => {
  console.warn = () => {};
  addFavicons();
  const customization = useSelector((state) => state.customization);

  document.body.classList.toggle(
    "darkTheme",
    customization.darkMode === "dark"
  );

  document.body.classList.toggle(
    "defaultTheme",
    customization.darkMode === "light"
  );
  const { i18n } = useTranslation();
  // const currentLocation = hookInstance.useRouter();
  // console.log("currentLocation", currentLocation);
  // const site = useSelector(siteState);
  // const locale = useSelector(localeState);
  // const [renderRoutes, setRenderRoutes] = React.useState(routes.buildRoutes());
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
              <BuildRoutes />
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
