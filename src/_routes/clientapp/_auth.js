import SignIn from "@authentication/signIn";
import SignUp from "@authentication/signUp";
import ForgotPassword from "@authentication/forgotPassword";
import CodeVerification from "@authentication/codeVerification";
import { navigateLocation } from "@routes/navigateLocation";
import { RequireLoggedIn, RequireAuth } from "@utils/requireAuth";

const AuthRoutes = [
  {
    path: navigateLocation.AUTH.SIGNIN,
    title: "SignIn | Workspace",
    element: (
      <RequireAuth
        redirectTo={navigateLocation.CLIENT_APP.APP}
        isAuthentication={true}
      >
        <SignIn />
      </RequireAuth>
    ),
  },
  {
    path: navigateLocation.AUTH.SIGNUP,
    title: "SignUp | Workspace",
    element: <SignUp />,
  },
  {
    path: navigateLocation.AUTH.FORGOT_PASSWORD,
    title: "Forgot Password | Workspace",
    element: <ForgotPassword />,
  },
  {
    path: navigateLocation.AUTH.CODE_VERIFICATION,
    title: "Code verification | Workspace",
    element: (
      <RequireLoggedIn
        redirectTo={navigateLocation.AUTH.SIGNIN}
        navigateTo={navigateLocation.CLIENT_APP.APP}
      >
        <CodeVerification />,
      </RequireLoggedIn>
    ),
  },
];

export default AuthRoutes;
