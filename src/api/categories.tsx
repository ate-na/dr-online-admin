import { Api } from "./base";

const categoryApi = Api.injectEndpoints({
  endpoints: (build) => ({
    // getLocations: build.query<>({}),
  }),
});
