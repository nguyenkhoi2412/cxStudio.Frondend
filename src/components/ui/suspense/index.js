import { Suspense } from "react";

// project imports
import { RequireLoggedIn, RequireAuth } from "@utils/requireAuth";
import Loader from "../pre";

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<Loader load={true} />}>
      {props.requireAuth ? (
        <RequireAuth redirectTo={props.redirectTo}>
          <Component {...props} />
        </RequireAuth>
      ) : (
        <Component {...props} />
      )}
    </Suspense>
  );

export default Loadable;
