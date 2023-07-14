import { Trans } from "react-i18next";
import { Navigate } from "react-router-dom";
import { navigateLocation } from "../navigateLocation";
import { RequireLoggedIn, RequireAuth } from "@utils/requireAuth";

// project imports
import DashboardLayout from "@dashboard/_layout";
import AccountRoutes from "./_account";
import SiteRoutes from "./_site";
import UtilitiesRoutes from "./_utilities";

// dashboard routing
import { DASHBOARD } from "@routes/componentLoadable";

// // sample page routing
// const SamplePage = Loadable(lazy(() => import("views/sample-page")));
// ==============================|| MAIN ROUTING ||============================== //

const SurveyInRoutes = [
  {
    path: navigateLocation.SURVEY.QUESTION,
    title: "survey.questions",
    element: (
      <DASHBOARD.DEFAULT
        requireAuth={true}
        redirectTo={navigateLocation.AUTH.SIGNIN}
        title="DashboardDefault"
      />
    ),
  },
  {
    path: navigateLocation.SURVEY.ANSWER,
    title: "survey.answers",
    element: (
      <DASHBOARD.DEFAULT
        requireAuth={true}
        redirectTo={navigateLocation.AUTH.SIGNIN}
        title="DashboardDefault"
      />
    ),
  },
  {
    path: navigateLocation.SURVEY.ORGANIZE_COURSE,
    title: "survey.organize_courses",
    element: (
      <DASHBOARD.DEFAULT
        requireAuth={true}
        redirectTo={navigateLocation.AUTH.SIGNIN}
        title="DashboardDefault"
      />
    ),
  },
];

export default SurveyInRoutes;
