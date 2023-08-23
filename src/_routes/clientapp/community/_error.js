import { navigateLocation } from "@routes/navigateLocation";
import { ERROR } from "@routes/componentLoadable";
import { Navigate } from "react-router-dom";

/* 👇️ only match this when no other routes match */
const ErrorCommunityRoutes = [
  {
    path: navigateLocation.ERROR.PAGE_NOTFOUND,
    title: "Page not found | Community",
    element: <ERROR.PAGE_NOTFOUND />,
  },
  {
    path: "*",
    title: "Page not found | Community",
    element: <Navigate to={navigateLocation.ERROR.PAGE_NOTFOUND} />,
  },
];

export default ErrorCommunityRoutes;
