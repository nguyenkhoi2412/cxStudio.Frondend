import { Navigate } from "react-router-dom";
import { navigatePath } from "@routes/navigatePath";
import { CLIENT_APP } from "@routes/componentLoadable";
import ChatBoxCommunityRoutes from "./_chatbox";
import ErrorRoutes from "./_error";

const CommunityRoutes = [
  {
    element: <CLIENT_APP.COMMUNITY.LAYOUT />,
    children: [
      {
        path: navigatePath.CLIENT_APP.COMMUNITY.INDEX,
        title: "💬 Chatbox | Community",
        element: (
          <CLIENT_APP.COMMUNITY.DEFAULT
            requireAuth={true}
            redirectTo={navigatePath.AUTH.SIGNIN}
          />
        ),
      },
    ],
  },
  ...ErrorRoutes,
  ...ChatBoxCommunityRoutes,
];

export default CommunityRoutes;
