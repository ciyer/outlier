import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { Provider } from "react-redux";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router";

import { store } from "./app/store";

import Root, { ErrorBoundary } from "./app/root";
import ArticleNotebook from "./features/article/ArticleNotebook";
import Index from "./routes/_index";
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
import FabricId from "./routes/product-fabrics/fabric-id";
import Fabrics from "./routes/product-fabrics/fabrics";
import ProductId from "./routes/products/product-id";
import StyleId from "./routes/product-styles/style-id";
import Styles from "./routes/product-styles/styles";
import { PATH_STRUCTURE } from "./routes/route-paths";

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
    ErrorBoundary,
    children: [
      { index: true, Component: Index },
      {
        path: PATH_STRUCTURE.products.path,
        Component: Outlet,
        children: [
          { index: true, element: <div>Select a product</div> },
          {
            path: PATH_STRUCTURE.products.children.product.path,
            Component: ProductId,
          },
        ],
      },
      {
        path: PATH_STRUCTURE.fabrics.path,
        Component: Outlet,
        children: [
          { index: true, Component: Fabrics },
          {
            path: PATH_STRUCTURE.fabrics.children.fabric.path,
            Component: FabricId,
          },
        ],
      },
      {
        path: PATH_STRUCTURE.styles.path,
        Component: Outlet,
        children: [
          { index: true, Component: Styles },
          {
            path: PATH_STRUCTURE.styles.children.style.path,
            Component: StyleId,
          },
        ],
      },
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
      {
        path: "articles",
        Component: Outlet,
        children: [
          {
            path: "2019review",
            element: <ArticleNotebook path="2019-review/2019-review.ipynb" />,
          },
          {
            path: "2020review",
            element: <ArticleNotebook path="2020-review/2020-review.ipynb" />,
          },
          {
            path: "2021review",
            element: <ArticleNotebook path="2021-review/2021-review.ipynb" />,
          },
          {
            path: "2022review",
            element: <ArticleNotebook path="2022-review/2022-review.ipynb" />,
          },
        ],
      },
      {
        path: "fabrics",
        Component: Outlet,
        children: [
          {
            path: "2020fabrics",
            element: <ArticleNotebook path="2020-review/2020-fabrics.ipynb" />,
          },
          {
            path: "2021fabrics",
            element: <ArticleNotebook path="2021-review/2021-fabrics.ipynb" />,
          },
          {
            path: "2022fabrics",
            element: <ArticleNotebook path="2022-review/2022-fabrics.ipynb" />,
          },
          {
            path: "2023fabrics",
            element: <ArticleNotebook path="2023-review/2023-fabrics.ipynb" />,
          },
          {
            path: "2024fabrics",
            element: <ArticleNotebook path="2024-review/2024-fabrics.ipynb" />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(root).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
