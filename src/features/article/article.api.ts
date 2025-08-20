// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { Notebook } from "./article.types";

type ArticleQueryParams = {
  path: string;
};

// Define a service using a base URL and expected endpoints
export const articleApi = createApi({
  reducerPath: "articleApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/articles" }),
  endpoints: (builder) => ({
    getArticleNotebook: builder.query<Notebook, ArticleQueryParams>({
      query: ({ path }) => `/${path}`,
    }),
  }),
});

export const { useGetArticleNotebookQuery } = articleApi;
