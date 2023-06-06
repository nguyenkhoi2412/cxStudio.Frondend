import "./app.scss";
import React from "react";
import { useTranslation } from "react-i18next";

import { BuildRoutes } from "@routes";
// import { hookInstance } from "@utils/hookInstance";
import NavigationScroll from "@utils/_layout/navigationScroll";
import { BrowserRouter } from "react-router-dom";
//#endregion
import { helpersExtension } from "@utils/helpersExtension";

const App = (props) => {
  console.warn = () => {};

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
    <>
      <BrowserRouter>
        {/* <BuildPagesRoute dataSource={renderRoutes} /> */}
        <NavigationScroll>
          <BuildRoutes />
        </NavigationScroll>
      </BrowserRouter>
    </>
  );
};

export default App;
