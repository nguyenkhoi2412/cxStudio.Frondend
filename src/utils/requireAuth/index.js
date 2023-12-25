import { Navigate } from "react-router-dom";
import storageHandler from "@constants/storageHandler";
import { crossCutting, storage } from "@utils/crossCutting";

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
    storage.local.get(storageHandler.AUTH.CURRENT_USER) !== undefined &&
    storage.cookie.get(storageHandler.AUTH.ACCESS_TOKEN) !== undefined
  );
};

export const isAuth = () => {
  return isLoggedIn() && _isVerified_2fa();
};

const _isVerified_2fa = () => {
  // return true;
  return crossCutting.check.isNotNull(
    storage.cookie.get(storageHandler.AUTH.VERIFIED_2FA)
  )
    ? storage.cookie.get(storageHandler.AUTH.VERIFIED_2FA) === "true"
    : false;
};
