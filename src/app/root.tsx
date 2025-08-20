import { Outlet } from "react-router";

import { AppFooter, AppNavBar } from "../features/nav";

import "./App.css";

export default function Root() {
  return (
    <>
      <AppNavBar />
      <div className="mt-3">
        <main role="main" className="container-fluid">
          <Outlet />
        </main>
      </div>
      <AppFooter />
    </>
  );
}
