export const PATHS = {
  product: "/product/:productId",
  style: "/style/:styleId",
};

export const PATH_STRUCTURE = {
  products: {
    path: "/product",
    children: {
      product: {
        path: ":productId",
      },
    },
  },
  styles: {
    path: "/style",
    children: {
      style: {
        path: ":styleId",
      },
    },
  },
};
