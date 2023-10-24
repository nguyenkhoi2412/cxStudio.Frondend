import { Navigate } from "react-router-dom";
import { navigateLocation } from "../navigateLocation";
import { RequireLoggedIn, RequireAuth } from "@utils/requireAuth";

// project imports
import { CLIENT_APP } from "@routes/componentLoadable";
import CommunityRoutes from "./community";
// ==============================|| MAIN ROUTING ||============================== //

const ClientAppRoutes = [
  {
    // element: <CLIENT_APP.LAYOUT />,
    element: <CLIENT_APP.COMMUNITY.CHATBOX.LAYOUT />,
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
