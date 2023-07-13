import { navigateLocation } from "../navigateLocation";
import { RequireAuth } from "@utils/requireAuth";

// account routing
import Component from "@routes/enumComponents";

const SiteRoutes = [
  {
    path: navigateLocation.SITE.LIST,
    title: "Site settings",
    element: (
      <RequireAuth redirectTo={navigateLocation.AUTH.SIGNIN}>
        <Component.DASHBOARD.DEFAULT title="DashboardDefault" />
      </RequireAuth>
    ),
  },
];

export default SiteRoutes;
