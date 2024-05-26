import { IResponseData } from "../types/base.modal";
import { ILocation } from "../types/location.model";
import { Api } from "./base";

const locationApi = Api.injectEndpoints({
  endpoints: (build) => ({
    getLocations: build.query<IResponseData<ILocation[]>, void>({
      query: () => {
        return {
          url: "/locations",
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetLocationsQuery, } = locationApi;
