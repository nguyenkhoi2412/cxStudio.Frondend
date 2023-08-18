import { Navigate } from "react-router-dom";
import { navigateLocation } from "../navigateLocation";
import { RequireLoggedIn, RequireAuth } from "@utils/requireAuth";
import { CLIENT_APP } from "@routes/componentLoadable";

const CommunityRoutes = {
  element: <CLIENT_APP.COMMUNITY.LAYOUT />,
  children: [
    {
      path: navigateLocation.CLIENT_APP.COMMUNITY.DEFAULT,
      title: "Chattin | Community",
      element: <CLIENT_APP.COMMUNITY.DEFAULT />,
    },
  ],
};

export default CommunityRoutes;
