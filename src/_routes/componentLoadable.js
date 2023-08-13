import { lazy } from "react";
import Loadable from "@components/ui/loadable";

// ==============================|| DASHBOARD ||============================== //
export const DASHBOARD = {
  LAYOUT: Loadable(lazy(() => import("@dashboard/_layout"))),
  DEFAULT: Loadable(lazy(() => import("@dashboard/default"))),
};

// ==============================|| CLIENT_APP ||============================== //
export const CLIENT_APP = {
  LAYOUT: Loadable(lazy(() => import("@clientapp/_layout"))),
  DEFAULT: Loadable(lazy(() => import("@clientapp/home"))),
  HOME: Loadable(lazy(() => import("@clientapp/home"))),
  COMMUNITY: {
    DEFAULT: Loadable(lazy(() => import("@clientapp/community"))),
  },
};
