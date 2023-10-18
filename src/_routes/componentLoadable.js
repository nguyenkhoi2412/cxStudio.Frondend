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
