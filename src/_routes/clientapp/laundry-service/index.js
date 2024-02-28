import { navigateLocation } from "@routes/navigateLocation";
import { CLIENT_APP } from "@routes/componentLoadable";
import APP from "@constants/app";
import ErrorRoutes from "./_error";

const LaundryServiceRoutes = [
  {
    element: <CLIENT_APP.LAYOUT appName={APP.LAUNDRY} />,
    children: [
      {
        path: navigateLocation.CLIENT_APP.LAUNDRY.DEFAULT,
        title: "💬 Chatbox | Workspace",
        element: (
          <CLIENT_APP.LAUNDRY.DEFAULT
            requireAuth={true}
            redirectTo={navigateLocation.AUTH.SIGNIN}
          />
        ),
      },
    ],
  },
  ...ErrorRoutes,
];

export default LaundryServiceRoutes;
