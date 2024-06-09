import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { provideTags } from "./index.constant";

export const Api = createApi({
  reducerPath: "api",
  tagTypes: provideTags,
  baseQuery: fetchBaseQuery({
    baseUrl: "https://pyschologist-api.liara.run/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      console.log("token", token);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
    validateStatus(response, body) {
      if (response.status === 401) {
        localStorage.clear();
      }
      return response.status === 200 || response.status === 201;
    },
  }),
  endpoints: (build) => ({}),
});
