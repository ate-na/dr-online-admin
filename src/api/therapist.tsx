import {
  ICreateOrEditTherapistReqBody,
  ITherapist,
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
    updateTherapist: build.mutation<void, Partial<ITherapist>>({
      query: (arg) => {
        return {
          url: `/therapist/${arg.id}`,
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
    getTherapistById: build.query<ITherapist, number>({
      query(arg) {
        return {
          url: `/therapist/${arg}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetAllTherapistQuery,
  useCreateTherapistMutation,
  useUpdateTherapistMutation,
  useDeleteTherapitMutation,
  useGetTherapistByIdQuery,
} = TherapistApi;
