import { Navigate } from "react-router-dom";
import { navigateLocation } from "@routes/navigateLocation";
import { CLIENT_APP } from "@routes/componentLoadable";
import ChatBoxCommunityRoutes from "./_chatbox";
import ErrorRoutes from "./_error";

const CommunityRoutes = [
  {
    element: <CLIENT_APP.COMMUNITY.LAYOUT />,
    children: [
      {
        path: navigateLocation.CLIENT_APP.COMMUNITY.INDEX,
        title: "💬 Chatbox | Community",
        element: (
          <CLIENT_APP.COMMUNITY.DEFAULT
            requireAuth={true}
            redirectTo={navigateLocation.AUTH.SIGNIN}
          />
        ),
      },
    ],
  },
  ...ErrorRoutes,
  ...ChatBoxCommunityRoutes,
];

export default CommunityRoutes;
