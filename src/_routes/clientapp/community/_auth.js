import SignIn from "@authentication/signIn";
import SignUp from "@authentication/signUp";
import ForgotPassword from "@authentication/forgotPassword";
import CodeVerification from "@authentication/codeVerification";
import { navigateLocation } from "@routes/navigateLocation";
import { RequireLoggedIn, RequireAuth } from "@utils/requireAuth";
import { AUTHENTICATION } from "@routes/componentLoadable";

const AuthCommunityRoutes = [
  {
    element: <AUTHENTICATION.LAYOUT />,
    children: [
      {
        path: navigateLocation.CLIENT_APP.COMMUNITY.AUTH.SIGNIN,
        title: "SignIn",
        element: (
          <RequireAuth
            redirectTo={navigateLocation.CLIENT_APP.COMMUNITY.DEFAULT}
            isAuthentication={true}
          >
            <SignIn />,
          </RequireAuth>
        ),
      },
      {
        path: navigateLocation.CLIENT_APP.COMMUNITY.AUTH.SIGNUP,
        title: "SignUp",
        element: <SignUp />,
      },
      {
        path: navigateLocation.CLIENT_APP.COMMUNITY.AUTH.FORGOT_PASSWORD,
        title: "Forgot Password",
        element: <ForgotPassword />,
      },
      {
        path: navigateLocation.CLIENT_APP.COMMUNITY.AUTH.CODE_VERIFICATION,
        title: "Code verification",
        element: (
          <RequireLoggedIn
            redirectTo={navigateLocation.CLIENT_APP.COMMUNITY.AUTH.SIGNIN}
            navigateTo={navigateLocation.CLIENT_APP.COMMUNITY.DEFAULT}
          >
            <CodeVerification />,
          </RequireLoggedIn>
        ),
      },
    ],
  },
];

export default AuthCommunityRoutes;
