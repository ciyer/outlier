import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router";

import { store } from "./app/store";

import Root from "./app/root";
import About from "./routes/about.mdx";
import {
  Collections,
  Ideas1,
  Ideas2,
  Ideas3,
  Ideas4,
  Ideas5,
  Ideas6,
  Ideas7,
} from "./routes/collections";

import "./styles/index.scss";
import "./index.css";

const root = document.getElementById("root");
if (!root) {
  throw new Error("Root element not found");
}

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      //      { index: true, Component: Home },
      { path: "about", Component: About },
      {
        path: "collections",
        Component: Outlet,
        children: [
          { index: true, Component: Collections },
          { path: "ideas/ideas-1", Component: Ideas1 },
          { path: "ideas/ideas-2", Component: Ideas2 },
          { path: "ideas/ideas-3", Component: Ideas3 },
          { path: "ideas/ideas-4", Component: Ideas4 },
          { path: "ideas/ideas-5", Component: Ideas5 },
          { path: "ideas/ideas-6", Component: Ideas6 },
          { path: "ideas/ideas-7", Component: Ideas7 },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(root).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
