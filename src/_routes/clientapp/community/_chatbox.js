import { navigatePath } from "@routes/navigatePath";
import { CLIENT_APP } from "@routes/componentLoadable";
import App from "@constants/app";

const ChatBoxCommunityRoutes = [
  {
    element: (
      <CLIENT_APP.COMMUNITY.LAYOUT appName={App.COMMUNITY.CHATBOX} />
    ),
    children: [
      {
        path: navigatePath.CLIENT_APP.COMMUNITY.CHATBOX.INDEX,
        title: "💬 Chatbox | Community",
        element: (
          <CLIENT_APP.COMMUNITY.CHATBOX.DEFAULT
            requireAuth={true}
            redirectTo={navigatePath.AUTH.SIGNIN}
          />
        ),
      },
    ],
  },
];

export default ChatBoxCommunityRoutes;
