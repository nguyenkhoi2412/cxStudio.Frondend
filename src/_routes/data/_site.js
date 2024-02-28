import { navigatePath } from "../navigatePath";

// account routing
import { DASHBOARD } from "@routes/componentLoadable";

const SiteRoutes = [
  {
    path: navigatePath.SITE.LIST,
    title: "Site settings",
    element: (
      <DASHBOARD.DEFAULT
        requireAuth={true}
        redirectTo={navigatePath.DASHBOARD.AUTH.SIGNIN}
        title="DashboardDefault"
      />
    ),
  },
];

export default SiteRoutes;
