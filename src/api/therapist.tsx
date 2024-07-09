import {
  ICreateOrEditTherapistReqBody,
  TTherapistsPageRes,
} from "../types/therapist.modal";
import { Api } from "./base";
import { provideTagsType } from "./index.constant";

const TherapistApi = Api.injectEndpoints({
  endpoints: (build) => ({
    getAllTherapist: build.query<TTherapistsPageRes, string>({
      query: (arg) => {
        return {
          url: `/therapist${arg ? `?${arg}` : ""}`,
          method: "GET",
        };
      },
      providesTags: [provideTagsType.therapist],
    }),
    createTherapist: build.mutation<void, ICreateOrEditTherapistReqBody>({
      query: (arg) => {
        return {
          url: "/therapist",
          method: "POST",
          body: arg,
        };
      },
      invalidatesTags: [provideTagsType.therapist],
    }),
    updateTherapist: build.mutation<void, ICreateOrEditTherapistReqBody>({
      query: (arg) => {
        return {
          url: "/therapist",
          method: "PATCH",
          body: arg,
        };
      },
      invalidatesTags: [provideTagsType.therapist],
    }),
    deleteTherapit: build.mutation<void, number>({
      query: (arg) => {
        return {
          url: `/therapist/${arg}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [provideTagsType.therapist],
    }),
  }),
});

export const {
  useGetAllTherapistQuery,
  useCreateTherapistMutation,
  useUpdateTherapistMutation,
  useDeleteTherapitMutation,
} = TherapistApi;
