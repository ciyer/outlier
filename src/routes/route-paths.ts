export const PATHS = {
  fabric: "/fabric/:fabricId",
  product: "/product/:productId",
  style: "/style/:styleId",
};

export const PATH_STRUCTURE = {
  fabrics: {
    path: "/fabric",
    children: {
      fabric: {
        path: ":fabricId",
      },
    },
  },
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
