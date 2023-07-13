import { Navigate } from "react-router-dom";
import { navigateLocation } from "../navigateLocation";

// project imports
import SurveyInRoutes from "./_surveyin";
import AccountRoutes from "./_account";
import SiteRoutes from "./_site";
import UtilitiesRoutes from "./_utilities";

// dashboard routing
import { DASHBOARD } from "@routes/enumComponents";

// // utilities routing
// const UtilsTypography = Loadable(
//   lazy(() => import("views/utilities/Typography"))
// );
// const UtilsColor = Loadable(lazy(() => import("views/utilities/Color")));
// const UtilsShadow = Loadable(lazy(() => import("views/utilities/Shadow")));
// const UtilsMaterialIcons = Loadable(
//   lazy(() => import("views/utilities/MaterialIcons"))
// );
// const UtilsTablerIcons = Loadable(
//   lazy(() => import("views/utilities/TablerIcons"))
// );

// // sample page routing
// const SamplePage = Loadable(lazy(() => import("views/sample-page")));
// ==============================|| MAIN ROUTING ||============================== //

const DashboardRoutes = {
  path: "/dashboard",
  element: <DASHBOARD.LAYOUT />,
  children: [
    {
      path: navigateLocation.DASHBOARD.DEFAULT,
      title: "Dashboard",
      element: (
        <DASHBOARD.DEFAULT
          requireAuth={true}
          redirectTo={navigateLocation.AUTH.SIGNIN}
          title="DashboardDefault"
        />
      ),
    },
    ...SiteRoutes,
    ...SurveyInRoutes,
    // ...AccountRoutes,
    ...UtilitiesRoutes,
    // {
    //   path: "utils",
    //   children: [
    //     {
    //       path: "util-typography",
    //       element: <UtilsTypography />,
    //     },
    //   ],
    // },
    // {
    //   path: "utils",
    //   children: [
    //     {
    //       path: "util-color",
    //       element: <UtilsColor />,
    //     },
    //   ],
    // },
    // {
    //   path: "utils",
    //   children: [
    //     {
    //       path: "util-shadow",
    //       element: <UtilsShadow />,
    //     },
    //   ],
    // },
    // {
    //   path: "icons",
    //   children: [
    //     {
    //       path: "tabler-icons",
    //       element: <UtilsTablerIcons />,
    //     },
    //   ],
    // },
    // {
    //   path: "icons",
    //   children: [
    //     {
    //       path: "material-icons",
    //       element: <UtilsMaterialIcons />,
    //     },
    //   ],
    // },
    // {
    //   path: "sample-page",
    //   element: <SamplePage />,
    // },
  ],
};

export default DashboardRoutes;
