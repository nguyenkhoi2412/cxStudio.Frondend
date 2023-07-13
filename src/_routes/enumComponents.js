import Loadable from "@components/ui/suspense";
import { lazy } from "react";

export default {
  DASHBOARD: {
    DEFAULT: Loadable(lazy(() => import("@dashboard/default"))),
  },
};
