import { Navigate } from "react-router-dom";
import storageHandler from "@constants/storageHandler";
import reduxStore from "@reduxproviders/_storeProvider";
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
  const stores = reduxStore.getState();
  const cookie = stores.sessionHandler?.data;

  if (crossCutting.check.isNull(cookie)) return false;

  return (
    crossCutting.check.isNotNull(
      storage.local.get(storageHandler.AUTH.CURRENT_USER)
    ) && crossCutting.check.isNotNull(cookie[storageHandler.AUTH.ACCESS_TOKEN])
  );
};

export const isAuth = () => {
  return isLoggedIn() && _isVerified_2fa();
};

const _isVerified_2fa = () => {
  // return true;
  const stores = reduxStore.getState();
  const cookie = stores.sessionHandler?.data;

  if (crossCutting.check.isNull(cookie)) return false;

  return crossCutting.check.isNotNull(cookie[storageHandler.AUTH.VERIFIED_2FA])
    ? cookie[storageHandler.AUTH.VERIFIED_2FA] === "true"
    : false;
};
