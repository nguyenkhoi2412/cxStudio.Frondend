import React from "react";
import { useRoutes } from "react-router-dom";
import { hookInstance } from "@utils/hookInstance";
import { useTranslation } from "react-i18next";
// routes
// import AuthenticationRoutes from "./data/authentication";
import DashboardRoutes from "./dashboard";
// import AuthenticationRoutes from './AuthenticationRoutes';

// ==============================|| ROUTING RENDER ||============================== //
export const BuildRoutes = () => {
  buildTitle();

  return useRoutes(RouteMaps());
};

export const RouteMaps = () => {
  return [...DashboardRoutes];
};

const buildTitle = () => {
  const currentLocation = hookInstance.useRouter();
  const { t } = useTranslation();
  const { pathname } = currentLocation;

  React.useEffect(() => {
    let currentTitle = {
      title: "No title???",
    };
    const currentRoute = RouteMaps().find((item) => {
      const { children } = item;
      if (!children) {
        return item.path === pathname;
      } else {
        currentTitle = children.find((child) => child.path === pathname);
      }
    });

    currentTitle = currentRoute?.title || currentTitle?.title;
    if (currentTitle) {
      document.title = t(currentTitle);
    }
  }, [currentLocation]);
};
