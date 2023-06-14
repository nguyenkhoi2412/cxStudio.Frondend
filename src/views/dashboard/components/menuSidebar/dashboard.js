import { navigateLocation } from "@routes/navigateLocation";
// assets

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: "dashboard",
  title: "Dashboard",
  type: "group",
  children: [
    {
      id: "default",
      title: "Reports",
      type: "item",
      url: navigateLocation.DASHBOARD.DEFAULT,
      // icon: AiOutlineDashboard,
      breadcrumbs: false,
    },
  ],
};

export default dashboard;
