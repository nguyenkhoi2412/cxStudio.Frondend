import { navigateLocation } from "@routes/navigateLocation";
import { CLIENT_APP } from "@routes/componentLoadable";
import AppCommunity from "@constants/app";

const ChatBoxCommunityRoutes = [
  {
    element: (
      <CLIENT_APP.COMMUNITY.LAYOUT appName={AppCommunity.COMMUNITY.CHATBOX} />
    ),
    children: [
      {
        path: navigateLocation.CLIENT_APP.COMMUNITY.CHATBOX.INDEX,
        title: "💬 Chatbox | Community",
        element: (
          <CLIENT_APP.COMMUNITY.CHATBOX.DEFAULT
            requireAuth={true}
            redirectTo={navigateLocation.CLIENT_APP.COMMUNITY.AUTH.SIGNIN}
          />
        ),
      },
    ],
  },
];

export default ChatBoxCommunityRoutes;
