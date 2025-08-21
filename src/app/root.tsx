import { Outlet, isRouteErrorResponse, useRouteError } from "react-router";

import { AppFooter, AppNavBar } from "../features/nav";

import "./App.css";

function ErrorPage({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <AppNavBar />
      <div className="mt-3">
        <main role="main" className="container-fluid">
          {children}
        </main>
      </div>
      <AppFooter />
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <ErrorPage>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </ErrorPage>
    );
  } else if (error instanceof Error) {
    return (
      <ErrorPage>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </ErrorPage>
    );
  }
  return (
    <ErrorPage>
      <h1>Unknown Error</h1>
    </ErrorPage>
  );
}

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
