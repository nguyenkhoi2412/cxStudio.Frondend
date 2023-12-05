import { navigateLocation } from "../navigateLocation";
import APP from "@constants/app";

// project imports
import { CLIENT_APP } from "@routes/componentLoadable";
import AuthRoutes from "./_auth";
import CommunityRoutes from "./community";
import LaundryServicesRoutes from "./laundry-service";
// ==============================|| MAIN ROUTING ||============================== //

const ClientAppRoutes = [
  ...AuthRoutes,
  {
    element: <CLIENT_APP.LAYOUT appName={APP.EMPTY} />,
    children: [
      {
        path: navigateLocation.CLIENT_APP.ASSET_PATH,
        title: "Create/Open a workspace",
        element: (
          <CLIENT_APP.HOME
            requireAuth={true}
            redirectTo={navigateLocation.AUTH.SIGNIN}
          />
        ),
      },
      {
        path: navigateLocation.CLIENT_APP.APP,
        title: "Create/Open a workspace",
        element: (
          <CLIENT_APP.HOME
            requireAuth={true}
            redirectTo={navigateLocation.AUTH.SIGNIN}
          />
        ),
      },
    ],
  },
  ...CommunityRoutes,
  ...LaundryServicesRoutes,
];
// path: navigateLocation.CLIENT_APP.ASSET_PATH,
// element: <CLIENT_APP.LAYOUT />,
// children: [
//   {
//     path: navigateLocation.CLIENT_APP.ASSET_PATH,
//     title: "Social profile",
//     element: <SocialProfile />,
//   },
// ],
// {
//   path: navigateLocation.CLIENT_APP.ASSET_PATH,
//   title: "Social profile",
//   element: <CLIENT_APP.HOME />,
// }{}
// ];

export default ClientAppRoutes;
