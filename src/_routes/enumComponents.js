import Loadable from "@components/ui/suspense";
import { lazy } from "react";

export default {
  DASHBOARD: {
    LAYOUT: Loadable(lazy(() => import("@dashboard/_layout"))),
    DEFAULT: Loadable(lazy(() => import("@dashboard/default"))),
  },
  CLIENT_APP: {
    LAYOUT: Loadable(lazy(() => import("@clientapp/_layout"))),
    DEFAULT: Loadable(lazy(() => import("@clientapp/home"))),
    HOME: Loadable(lazy(() => import("@clientapp/home"))),
  },
};
