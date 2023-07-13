import { Suspense } from "react";

// project imports
import Loader from "../pre";

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

const Loadable = (Component) => (props) =>
  (
    // <Suspense fallback={<Loader />}>
    <Suspense fallback={<Loader load={true} />}>
      <Component {...props} />
    </Suspense>
  );

export default Loadable;
