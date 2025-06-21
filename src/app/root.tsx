import { Outlet } from "react-router";

import { AppFooter, AppNavBar } from "../features/nav";

import "./App.css";

export default function Root() {
  return (
    <div>
      <AppNavBar />
      <main role="main" className="container-fluid">
        {/* will either be <Home> or <Settings> */}
        <Outlet />
      </main>
      <AppFooter />
    </div>
  );
}
