import { Navigate } from "react-router-dom";
import { navigateLocation } from "@routes/navigateLocation";
import { CLIENT_APP } from "@routes/componentLoadable";
import AuthenticationRoutes from "./_auth";
import AccountCommunityRoutes from "./_account";
import ErrorRoutes from "./_error";

const CommunityRoutes = [
  {
    element: <CLIENT_APP.COMMUNITY.LAYOUT />,
    children: [
      {
        path: navigateLocation.CLIENT_APP.COMMUNITY.DEFAULT,
        title: "💬 Chatbox | Community",
        element: (
          <CLIENT_APP.COMMUNITY.DEFAULT
            requireAuth={true}
            redirectTo={navigateLocation.CLIENT_APP.COMMUNITY.AUTH.SIGNIN}
          />
        ),
      },
    ],
  },
  ...ErrorRoutes,
  ...AuthenticationRoutes,
  ...AccountCommunityRoutes,
];

export default CommunityRoutes;
