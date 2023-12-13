import { useRoutes } from "react-router-dom";
import { hookInstance } from "@utils/hookInstance";
import { useTranslation } from "react-i18next";
// routes
// import AuthenticationRoutes from "./data/authentication";
import DashboardRoutes from "./dashboard";
import ClientAppRoutes from "./clientapp";
// import AuthenticationRoutes from './AuthenticationRoutes';

// ==============================|| ROUTING RENDER ||============================== //
export const BuildRoutes = () => {
  buildTitle();

  return useRoutes(RouteMaps());
};

export const RouteMaps = () => {
  return [ ...ClientAppRoutes];
};

const buildTitle = () => {
  const currentLocation = hookInstance.useRouter();
  const { t } = useTranslation();
  const { pathname } = currentLocation;

  React.useEffect(() => {
    let currentTitle = null;
    const currentRoute = RouteMaps().find((item) => {
      const { children } = item;
      if (!children) {
        return item.path === pathname;
      } else {
        return children.find((child) => {
          if (child.path === pathname) {
            currentTitle = child?.title;
            return child;
          }
        });
      }
    });

    if (currentTitle === null) currentTitle = currentRoute?.title || "";
    document.title = t(currentTitle);
  }, [currentLocation]);
};
