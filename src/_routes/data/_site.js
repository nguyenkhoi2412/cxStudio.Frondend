import { navigateLocation } from "../navigateLocation";
import { RequireAuth } from "@utils/requireAuth";

// account routing
import DashboardDefault from "@dashboard/default";

const SiteRoutes = [
  {
    path: navigateLocation.SITE.LIST,
    title: "Site settings",
    element: (
      <RequireAuth redirectTo={navigateLocation.AUTH.SIGNIN}>
        <DashboardDefault />
      </RequireAuth>
    ),
  },
];

export default SiteRoutes;
