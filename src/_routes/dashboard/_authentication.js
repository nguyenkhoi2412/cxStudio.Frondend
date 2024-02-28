import SignIn from "@authentication/signIn";
import SignUp from "@authentication/signUp";
import ForgotPassword from "@authentication/forgotPassword";
import CodeVerification from "@authentication/codeVerification";
import { navigatePath } from "@routes/navigatePath";
import { RequireLoggedIn, RequireAuth } from "@utils/requireAuth";

import Component from "@routes/componentLoadable";

const AuthenticationRoutes = [
  // {
  //   path: navigatePath.CLIENT_APP.ASSET_PATH,
  //   title: "SignIn",
  //   element: (
  //     <RequireAuth
  //       redirectTo={navigatePath.DASHBOARD.DEFAULT}
  //       isAuthentication={true}
  //     >
  //       <SignIn />,
  //     </RequireAuth>
  //   ),
  // },
  {
    path: navigatePath.DASHBOARD.AUTH.SIGNIN,
    title: "SignIn",
    element: (
      <RequireAuth
        redirectTo={navigatePath.DASHBOARD.DEFAULT}
        isAuthentication={true}
      >
        <SignIn />,
      </RequireAuth>
    ),
  },
  {
    path: navigatePath.DASHBOARD.AUTH.SIGNUP,
    title: "SignUp",
    element: <SignUp />,
  },
  {
    path: navigatePath.DASHBOARD.AUTH.FORGOT_PASSWORD,
    title: "Forgot Password",
    element: <ForgotPassword />,
  },
  {
    path: navigatePath.DASHBOARD.AUTH.CODE_VERIFICATION,
    title: "Code verification",
    element: (
      <RequireLoggedIn
        redirectTo={navigatePath.DASHBOARD.AUTH.SIGNIN}
        navigateTo={navigatePath.DASHBOARD.DEFAULT}
      >
        <CodeVerification />,
      </RequireLoggedIn>
    ),
  },
];

export default AuthenticationRoutes;
