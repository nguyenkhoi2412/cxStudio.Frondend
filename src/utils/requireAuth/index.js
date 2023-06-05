import { Navigate } from "react-router-dom";
import { helpersExtension, storedExtension } from "@utils/helpersExtension";
import storageHandler from "@constants/storageHandler";

export const RequireLoggedIn = ({ children, redirectTo, navigateTo }) => {
  if (isAuth()) return <Navigate to={navigateTo} />;
  return isLoggedIn() ? children : <Navigate to={redirectTo} />;
};

export const RequireAuth = ({
  children,
  redirectTo,
  isAuthentication = false,
}) => {
  if (isAuthentication)
    return isAuth() ? <Navigate to={redirectTo} /> : children;
  return isAuth() ? children : <Navigate to={redirectTo} />;
};

export const isLoggedIn = () => {
  return (
    helpersExtension.checkIsNotNull(
      localStorage.getItem(storageHandler.DASHBOARD.CURRENT_USER)
    ) &&
    helpersExtension.checkIsNotNull(
      storedExtension.getCookie(storageHandler.DASHBOARD.ACCESS_TOKEN)
    )
  );
};

export const isAuth = () => {
  // return isLoggedIn() && _isVerified_2fa();
  return true;
};

const _isVerified_2fa = () => {
  return helpersExtension.checkIsNotNull(
    storedExtension.getCookie(storageHandler.DASHBOARD.VERIFIED_2FA)
  )
    ? storedExtension.getCookie(storageHandler.DASHBOARD.VERIFIED_2FA) ===
        "true"
    : false;
};
