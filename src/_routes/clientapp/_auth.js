import SignIn from '@authentication/signIn';
import SignUp from '@authentication/signUp';
import ForgotPassword from '@authentication/forgotPassword';
import CodeVerification from '@authentication/codeVerification';
import { navigatePath } from '@routes/navigatePath';
import { RequireLoggedIn, RequireAuth } from '@utils/requireAuth';

const AuthRoutes = [
  {
    path: navigatePath.AUTH.SIGNIN,
    title: 'SignIn | Workspace',
    element: (
      <RequireAuth
        redirectTo={navigatePath.CLIENT_APP.WORKSPACE}
        isAuthentication={true}
      >
        <SignIn />
      </RequireAuth>
    ),
  },
  {
    path: navigatePath.AUTH.SIGNUP,
    title: 'SignUp | Workspace',
    element: <SignUp />,
  },
  {
    path: navigatePath.AUTH.FORGOT_PASSWORD,
    title: 'Forgot Password | Workspace',
    element: <ForgotPassword />,
  },
  {
    path: navigatePath.AUTH.CODE_VERIFICATION,
    title: 'Code verification | Workspace',
    element: (
      <RequireLoggedIn
        redirectTo={navigatePath.AUTH.SIGNIN}
        navigateTo={navigatePath.CLIENT_APP.WORKSPACE}
      >
        <CodeVerification />,
      </RequireLoggedIn>
    ),
  },
];

export default AuthRoutes;
