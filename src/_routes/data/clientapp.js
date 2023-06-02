import { Navigate } from "react-router-dom";
import { navigateLocation } from "../navigateLocation";
import { RequireLoggedIn, RequireAuth } from "@utils/requireAuth";

// project imports
// import Layout from "@clientapp/_layout";
import Home from "@clientapp/home";
// ==============================|| MAIN ROUTING ||============================== //

const ClientAppRoutes = [
  // path: navigateLocation.CLIENT_APP.ASSET_PATH,
  // element: <Layout />,
  // children: [
  //   {
  //     path: navigateLocation.CLIENT_APP.ASSET_PATH,
  //     title: "Social profile",
  //     element: <SocialProfile />,
  //   },
  // ],

  {
    path: navigateLocation.CLIENT_APP.ASSET_PATH,
    title: "Home page",
    element: <Home />,
  },
];

export default ClientAppRoutes;
