export const PATHS = {
  product: "/product/:productId",
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
};
