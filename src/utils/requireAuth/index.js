import { Navigate } from "react-router-dom";
import { cookie } from "@utils/crossCutting";
import storageHandler from "@constants/storageHandler";
import { crossCutting, savedLocal } from "@utils/crossCutting";

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
    savedLocal.get(storageHandler.AUTH.CURRENT_USER) !== undefined &&
    cookie.get(storageHandler.AUTH.ACCESS_TOKEN) !== undefined
  );
};

export const isAuth = () => {
  return isLoggedIn() && _isVerified_2fa();
};

const _isVerified_2fa = () => {
  // return true;
  return crossCutting.check.isNotNull(
    cookie.get(storageHandler.AUTH.VERIFIED_2FA)
  )
    ? cookie.get(storageHandler.AUTH.VERIFIED_2FA) === "true"
    : false;
};
