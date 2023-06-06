import React from "react";

const BaseLayout = ({ children }) => {
  return <main>{children || <Outlet />}</main>;
};

export default BaseLayout;
