import { lazy } from "react";
import Loadable from "@components/ui/loadable";

// ==============================|| DASHBOARD ||============================== //
export const DASHBOARD = {
  LAYOUT: Loadable(lazy(() => import("@dashboard/_layout"))),
  DEFAULT: Loadable(lazy(() => import("@dashboard/default"))),
};

// ==============================|| MAINTENANCE ||============================== //
export const ERROR = {
  PAGE_NOTFOUND: Loadable(lazy(() => import("@views/errors/pageNotFound"))),
};

// ==============================|| CLIENT_APP ||============================== //
export const CLIENT_APP = {
  LAYOUT: Loadable(lazy(() => import("@clientapp/_layout"))),
  DEFAULT: Loadable(lazy(() => import("@clientapp/home"))),
  HOME: Loadable(lazy(() => import("@clientapp/home"))),
  COMMUNITY: {
    LAYOUT: Loadable(lazy(() => import("@clientapp/community/_layout"))),
    DEFAULT: Loadable(lazy(() => import("@clientapp/community"))),
    //#region CHATBOX
    CHATBOX: {
      DEFAULT: Loadable(lazy(() => import("@clientapp/community/chatbox"))),
    },
    //#endregion
  },
};
