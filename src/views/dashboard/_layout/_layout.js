import { Outlet } from "react-router-dom";
import Header from "@dashboard/components/header";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
