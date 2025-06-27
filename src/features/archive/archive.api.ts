// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { parseArchiveCsv, type DataRow } from "./Data";

// Define a service using a base URL and expected endpoints
export const archiveApi = createApi({
  reducerPath: "archiveApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    getArchiveData: builder.query<DataRow[], void>({
      query: () => ({
        url: "/outlier-data.csv",
        headers: {
          "content-type": "text/plain",
        },
        responseHandler: "text",
      }),
      transformResponse: (response: string) => {
        return parseArchiveCsv(response);
      },
    }),
  }),
});

export const { useGetArchiveDataQuery } = archiveApi;
