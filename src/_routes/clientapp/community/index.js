import { Navigate } from "react-router-dom";
import { navigateLocation } from "@routes/navigateLocation";
import { CLIENT_APP } from "@routes/componentLoadable";
import AuthenticationRoutes from "./_auth";

const CommunityRoutes = [
  ...AuthenticationRoutes,
  {
    element: <CLIENT_APP.COMMUNITY.LAYOUT />,
    children: [
      {
        path: navigateLocation.CLIENT_APP.COMMUNITY.DEFAULT,
        title: "Chattbox | Community",
        element: (
          <CLIENT_APP.COMMUNITY.DEFAULT
            requireAuth={true}
            redirectTo={navigateLocation.CLIENT_APP.COMMUNITY.AUTH.SIGNIN}
          />
        ),
      },
    ],
  },
];

export default CommunityRoutes;
