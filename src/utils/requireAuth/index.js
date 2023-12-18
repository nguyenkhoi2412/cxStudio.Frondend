import { Navigate } from "react-router-dom";
import { crossCutting } from "@utils/crossCutting";
import { storedHelper } from "@utils/stored.helper"
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
  // return true;
  return (
    crossCutting.isNotNull(
      localStorage.getItem(storageHandler.AUTH.CURRENT_USER)
    ) &&
    crossCutting.isNotNull(
      storedHelper.getCookie(storageHandler.AUTH.ACCESS_TOKEN)
    )
  );
};

export const isAuth = () => {
  return isLoggedIn() && _isVerified_2fa();
};

const _isVerified_2fa = () => {
  // return true;
  return crossCutting.isNotNull(
    storedHelper.getCookie(storageHandler.AUTH.VERIFIED_2FA)
  )
    ? storedHelper.getCookie(storageHandler.AUTH.VERIFIED_2FA) ===
        "true"
    : false;
};
