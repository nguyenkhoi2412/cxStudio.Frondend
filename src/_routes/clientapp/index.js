import { navigateLocation } from "../navigateLocation";
import APP from "@constants/app";

// project imports
import { CLIENT_APP } from "@routes/componentLoadable";
import CommunityRoutes from "./community";
// ==============================|| MAIN ROUTING ||============================== //

const ClientAppRoutes = [
  {
    // element: <CLIENT_APP.LAYOUT />,
    element: (
      <CLIENT_APP.COMMUNITY.LAYOUT appName={APP.COMMUNITY.CHATBOX} />
    ),
    children: [
      {
        path: navigateLocation.CLIENT_APP.ASSET_PATH,
        title: "💬 Chatbox | Community",
        // element: <CLIENT_APP.HOME />,
        element: (
          <CLIENT_APP.COMMUNITY.CHATBOX.DEFAULT
            requireAuth={true}
            redirectTo={navigateLocation.CLIENT_APP.COMMUNITY.AUTH.SIGNIN}
          />
        ),
      },
    ],
  },
  ...CommunityRoutes,
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
