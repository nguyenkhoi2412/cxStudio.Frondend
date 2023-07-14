import { navigateLocation } from "../navigateLocation";

// account routing
import { DASHBOARD } from "@routes/componentLoadable";

const SiteRoutes = [
  {
    path: navigateLocation.SITE.LIST,
    title: "Site settings",
    element: (
      <DASHBOARD.DEFAULT
        requireAuth={true}
        redirectTo={navigateLocation.AUTH.SIGNIN}
        title="DashboardDefault"
      />
    ),
  },
];

export default SiteRoutes;
