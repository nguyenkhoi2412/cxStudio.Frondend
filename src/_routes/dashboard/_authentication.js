import SignIn from "@authentication/signIn";
import SignUp from "@authentication/signUp";
import ForgotPassword from "@authentication/forgotPassword";
import CodeVerification from "@authentication/codeVerification";
import { navigateLocation } from "@routes/navigateLocation";
import { RequireLoggedIn, RequireAuth } from "@utils/requireAuth";

import Component from "@routes/componentLoadable";

const AuthenticationRoutes = [
  // {
  //   path: navigateLocation.CLIENT_APP.ASSET_PATH,
  //   title: "SignIn",
  //   element: (
  //     <RequireAuth
  //       redirectTo={navigateLocation.DASHBOARD.DEFAULT}
  //       isAuthentication={true}
  //     >
  //       <SignIn />,
  //     </RequireAuth>
  //   ),
  // },
  {
    path: navigateLocation.DASHBOARD.AUTH.SIGNIN,
    title: "SignIn",
    element: (
      <RequireAuth
        redirectTo={navigateLocation.DASHBOARD.DEFAULT}
        isAuthentication={true}
      >
        <SignIn />,
      </RequireAuth>
    ),
  },
  {
    path: navigateLocation.DASHBOARD.AUTH.SIGNUP,
    title: "SignUp",
    element: <SignUp />,
  },
  {
    path: navigateLocation.DASHBOARD.AUTH.FORGOT_PASSWORD,
    title: "Forgot Password",
    element: <ForgotPassword />,
  },
  {
    path: navigateLocation.DASHBOARD.AUTH.CODE_VERIFICATION,
    title: "Code verification",
    element: (
      <RequireLoggedIn
        redirectTo={navigateLocation.DASHBOARD.AUTH.SIGNIN}
        navigateTo={navigateLocation.DASHBOARD.DEFAULT}
      >
        <CodeVerification />,
      </RequireLoggedIn>
    ),
  },
];

export default AuthenticationRoutes;
