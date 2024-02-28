import { navigatePath } from "../navigatePath";
import { RequireAuth } from "@utils/requireAuth";

// account routing
import AccountSocial from "@dashboard/account/social";
import AccountProfile from "@dashboard/account/profile";
import AccountDetails from "@dashboard/account/details";
import ChangePassword from "@dashboard/account/changePassword";
import CreateNew from "@dashboard/account/createNew";
import UserList from "@dashboard/account/userlist";

const AccountRoutes = [
  {
    path: navigatePath.ACCOUNT.SOCIAL,
    title: "Social",
    element: (
      <RequireAuth redirectTo={navigatePath.DASHBOARD.AUTH.SIGNIN}>
        <AccountSocial />
      </RequireAuth>
    ),
  },
  {
    path: navigatePath.ACCOUNT.PROFILE,
    title: "My profiles",
    element: (
      <RequireAuth redirectTo={navigatePath.DASHBOARD.AUTH.SIGNIN}>
        <AccountProfile />
      </RequireAuth>
    ),
  },
  {
    path: navigatePath.ACCOUNT.SETTING,
    title: "Account setting",
    element: (
      <RequireAuth redirectTo={navigatePath.DASHBOARD.AUTH.SIGNIN}>
        <AccountDetails />
      </RequireAuth>
    ),
  },
  {
    path: navigatePath.ACCOUNT.CHANGE_PASSOWRD,
    title: "Change password",
    element: (
      <RequireAuth redirectTo={navigatePath.DASHBOARD.AUTH.SIGNIN}>
        <ChangePassword />
      </RequireAuth>
    ),
  },
  {
    path: navigatePath.ACCOUNT.CREATE_NEW,
    title: "Create new",
    element: (
      <RequireAuth redirectTo={navigatePath.DASHBOARD.AUTH.SIGNIN}>
        <CreateNew />
      </RequireAuth>
    ),
  },
  {
    path: navigatePath.ACCOUNT.USER_LIST,
    title: "Userlist",
    element: (
      <RequireAuth redirectTo={navigatePath.DASHBOARD.AUTH.SIGNIN}>
        <UserList />
      </RequireAuth>
    ),
  },
];

export default AccountRoutes;
