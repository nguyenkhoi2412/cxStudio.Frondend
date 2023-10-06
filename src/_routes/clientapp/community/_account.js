import SignIn from "@authentication/signIn";
import SignUp from "@authentication/signUp";
import ForgotPassword from "@authentication/forgotPassword";
import CodeVerification from "@authentication/codeVerification";
import { navigateLocation } from "@routes/navigateLocation";
import { RequireLoggedIn, RequireAuth } from "@utils/requireAuth";
import { CLIENT_APP } from "@routes/componentLoadable";
import { AUTHENTICATION } from "@routes/componentLoadable";

const AccountCommunityRoutes = [
  {
    // path: navigateLocation.CLIENT_APP.COMMUNITY.ACCOUNT.SETTING,
    element: <CLIENT_APP.COMMUNITY.LAYOUT />,
    children: [
      {
        path: navigateLocation.CLIENT_APP.COMMUNITY.ACCOUNT.SETTING,
        title: "Setting | Community",
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

export default AccountCommunityRoutes;
