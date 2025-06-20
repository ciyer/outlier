import { Outlet } from "react-router";

import { AppFooter, AppNavBar } from "./nav";

export default function Root() {
  return (
    <div>
      <AppNavBar />
      {/* will either be <Home> or <Settings> */}
      <Outlet />
      <AppFooter />
    </div>
  );
}
