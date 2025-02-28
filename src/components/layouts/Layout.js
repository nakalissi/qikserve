import { Outlet } from "react-router";

import Header from "../molecules/Header";

const Layout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

export default Layout;
