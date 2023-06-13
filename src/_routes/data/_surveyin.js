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
import DashboardDefault from "@dashboard/default";

// // sample page routing
// const SamplePage = Loadable(lazy(() => import("views/sample-page")));
// ==============================|| MAIN ROUTING ||============================== //

const SurveyInRoutes = [
  {
    path: navigateLocation.SURVEY.QUESTION,
    title: <Trans i18nKey={"survey.questions"}></Trans>,
    element: (
      <RequireAuth redirectTo={navigateLocation.AUTH.SIGNIN}>
        <DashboardDefault title="DashboardDefault" />
      </RequireAuth>
    ),
  },
  {
    path: navigateLocation.SURVEY.ANSWER,
    title: <Trans i18nKey={"survey.answers"}></Trans>,
    element: (
      <RequireAuth redirectTo={navigateLocation.AUTH.SIGNIN}>
        <DashboardDefault title="DashboardDefault" />
      </RequireAuth>
    ),
  },
  {
    path: navigateLocation.SURVEY.ORGANIZE_COURSE,
    title: <Trans i18nKey={"survey.organize_courses"}></Trans>,
    element: (
      <RequireAuth redirectTo={navigateLocation.AUTH.SIGNIN}>
        <DashboardDefault title="DashboardDefault" />
      </RequireAuth>
    ),
  },
];

export default SurveyInRoutes;
