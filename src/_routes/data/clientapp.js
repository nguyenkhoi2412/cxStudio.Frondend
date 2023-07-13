import { Navigate } from "react-router-dom";
import { navigateLocation } from "../navigateLocation";
import { RequireLoggedIn, RequireAuth } from "@utils/requireAuth";

// project imports
import Component from "@routes/enumComponents";
// ==============================|| MAIN ROUTING ||============================== //

const ClientAppRoutes = [
  // path: navigateLocation.CLIENT_APP.ASSET_PATH,
  // element: <Component.CLIENT_APP.LAYOUT />,
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
    element: <Component.CLIENT_APP.HOME />,
  },
];

export default ClientAppRoutes;
