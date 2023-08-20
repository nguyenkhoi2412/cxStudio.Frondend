import { Suspense } from "react";

// project imports
import { RequireLoggedIn, RequireAuth } from "@utils/requireAuth";
import Loader from "../loading";

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<Loader load={true} />}>
      {props.requireAuth ? (
        <RequireAuth
          redirectTo={props.redirectTo}
          isAuthentication={
            props.isAuthentication !== null &&
            props.isAuthentication !== undefined
              ? props.isAuthentication
              : false
          }
        >
          <Component {...props} />
        </RequireAuth>
      ) : (
        <Component {...props} />
      )}
    </Suspense>
  );

export default Loadable;
