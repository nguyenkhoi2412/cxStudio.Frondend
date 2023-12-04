import { Navigate } from "react-router-dom";
import { navigateLocation } from "@routes/navigateLocation";
import { CLIENT_APP } from "@routes/componentLoadable";
import ChatBoxCommunityRoutes from "./_chatbox";
import ErrorRoutes from "./_error";

const LaundryServiceRoutes = [
  {
    element: <CLIENT_APP.LAUNDRY_SERVICE.LAYOUT />,
    children: [
      {
        path: navigateLocation.CLIENT_APP.LAUNDRY_SERVICE.INDEX,
        title: "💬 Chatbox | Workspace",
        element: (
          <CLIENT_APP.LAUNDRY_SERVICE.DEFAULT
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

export default LaundryServiceRoutes;
