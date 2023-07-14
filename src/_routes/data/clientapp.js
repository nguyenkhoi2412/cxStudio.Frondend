import { Navigate } from "react-router-dom";
import { navigateLocation } from "../navigateLocation";
import { RequireLoggedIn, RequireAuth } from "@utils/requireAuth";

// project imports
import { CLIENT_APP } from "@routes/componentLoadable";
// ==============================|| MAIN ROUTING ||============================== //

const ClientAppRoutes = [
  // path: navigateLocation.CLIENT_APP.ASSET_PATH,
  // element: <CLIENT_APP.LAYOUT />,
  // children: [
  //   {
  //     path: navigateLocation.CLIENT_APP.ASSET_PATH,
  //     title: "Social profile",
  //     element: <SocialProfile />,
  //   },
  // ],
  {
    path: navigateLocation.CLIENT_APP.ASSET_PATH,
    title: "Social profile",
    element: <CLIENT_APP.HOME />,
  },
];

export default ClientAppRoutes;
