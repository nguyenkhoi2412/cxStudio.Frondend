import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default Layout;
