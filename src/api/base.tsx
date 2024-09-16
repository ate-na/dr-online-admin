import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { provideTags } from "./index.constant";

export const Api = createApi({
  reducerPath: "api",
  tagTypes: provideTags,
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
    validateStatus(response) {
      if (response.status === 401) {
        localStorage.clear();
      }
      return response.status === 200 || response.status === 201;
    },
  }),
  endpoints: () => ({}),
});
