import "./app.scss";
import { useTranslation } from "react-i18next";
import defaultFavicon from "@assets/favicons/default/favicon.svg";
import _globalVars from "@constants/variables";
import { BuildRoutes } from "@routes";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@mui/system";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { configBaseTheme } from "@theme/_base";
import NavigationScroll from "@utils/_layout/navigationScroll";
import { BrowserRouter } from "react-router-dom";
import WpBackdrop from "@components/mui-ui/backdropSpin";
import WpProgressBar from "@components/mui-ui/progressBar";
import WpSnackBar from "@components/mui-ui/snackBar";
import WpDrawer from "@components/mui-ui/drawer";
import { crossCutting, hook } from "@utils/crossCutting";
import { useDispatch, useSelector } from "react-redux";
import {
  SHOW_SPIN,
  HIDE_SPIN,
} from "@components/mui-ui/backdropSpin/backdropSpin.reducer";
import { DETECT_BROWSER_NAVIGATION } from "@reduxproviders/utils/navigation.reducer";
import { UPDATE_COOKIE } from "@reduxproviders/sessionStorage.reducer";
import authServices from "@services/auth";

//#region call api
import { SITE_GET_BY_ID, siteState } from "@reduxproviders/site.reducer";
//#endregion

const App = (props) => {
  console.warn = () => {};
  addFavicons();
  const customization = useSelector((state) => state.customization);
  const siteDatas = useSelector(siteState);
  const dispatch = useDispatch();
  const savedLocale = hook.useLocalStorage("locale");

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
      SITE_GET_BY_ID({
        id: _globalVars.SITE_ID,
      })
    )
      .unwrap()
      .then((payload) => {
        savedLocale.save(payload.rs.locale.filter((lc) => lc.is_default)[0]);
      });
  };
  //#endregion

  //#region useEffect
  React.useEffect(() => {
    i18n.changeLanguage("en-US");
    handleResize();
    // Detect page REFRESH or not
    dispatch(DETECT_BROWSER_NAVIGATION());

    //*get cookie check user login?
    authServices.secure().then((rs) => {
      dispatch(UPDATE_COOKIE(rs));
    });

    //* GET SITE INFO
    getSiteInfosById();

    //* SHOW SPIN
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
  const handleResize = crossCutting.debounce(() => {
    setDeviceInfos(crossCutting.detectEnvironment());
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

        <WpProgressBar />
        <WpBackdrop />
        <WpSnackBar />
        <WpDrawer />
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
