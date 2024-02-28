import { navigatePath } from "@routes/navigatePath";
import { ERROR } from "@routes/componentLoadable";
import { Navigate } from "react-router-dom";

/* 👇️ only match this when no other routes match */
const ErrorLaundryServiceRoutes = [
  {
    path: navigatePath.ERROR.PAGE_NOTFOUND,
    title: "Page not found",
    element: <ERROR.PAGE_NOTFOUND />,
  },
  {
    path: "*",
    title: "Page not found",
    element: <Navigate to={navigatePath.ERROR.PAGE_NOTFOUND} />,
  },
];

export default ErrorLaundryServiceRoutes;
