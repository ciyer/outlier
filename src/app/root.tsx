import { Outlet } from "react-router";

import { AppFooter, AppNavBar } from "../features/nav";

import "./App.css";

export default function Root() {
  return (
    <div>
      <AppNavBar />
      <main role="main" className="container-fluid">
        <Outlet />
      </main>
      <AppFooter />
    </div>
  );
}
