import {
  TCreateOrEditLocationReqBody,
  TLocationPageRes,
  TCreateOrUpdateResponse,
} from "../types/location.model";
import { Api } from "./base";
import { provideTags, provideTagsType } from "./index.constant";

const locationApi = Api.injectEndpoints({
  endpoints: (build) => ({
    getLocations: build.query<TLocationPageRes, void>({
      query: () => {
        return {
          url: "/locations",
          method: "GET",
        };
      },
      providesTags: [provideTagsType.location],
    }),
    createLocation: build.mutation<
      TCreateOrUpdateResponse,
      TCreateOrEditLocationReqBody
    >({
      query: (arg) => {
        return {
          url: "/locations",
          method: "POST",
          body: arg,
        };
      },
      invalidatesTags: [provideTagsType.location],
    }),
    updateLocation: build.mutation<
      TCreateOrUpdateResponse,
      TCreateOrEditLocationReqBody
    >({
      query: (arg) => {
        return {
          url: `/locations/${arg?.id}`,
          method: "POST",
          body: arg,
        };
      },
      invalidatesTags: [provideTagsType.location],
    }),
    deleteLocation: build.mutation<void, number>({
      query: (body) => {
        return {
          url: `/locations/${body}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [provideTagsType.location],
    }),
  }),
});

export const {
  useGetLocationsQuery,
  useCreateLocationMutation,
  useDeleteLocationMutation,
  useUpdateLocationMutation
} = locationApi;
