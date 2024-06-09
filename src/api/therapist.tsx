import {
  ICreateOrEditTherapistReqBody,
  TTherapistsPageRes,
} from "../types/therapist.modal";
import { Api } from "./base";

const TherapistApi = Api.injectEndpoints({
  endpoints: (build) => ({
    getAllTherapist: build.query<TTherapistsPageRes, string>({
      query: (arg) => {
        return {
          url: `/therapist${arg ? `/${arg}` : ""}`,
          method: "GET",
        };
      },
    }),
    createTherapist: build.mutation<void, ICreateOrEditTherapistReqBody>({
      query: (arg) => {
        return {
          url: "/therapist",
          method: "POST",
          body: arg,
        };
      },
    }),
    updateTherapist: build.mutation<void, ICreateOrEditTherapistReqBody>({
      query: (arg) => {
        return {
          url: "/therapist",
          method: "PATCH",
          body: arg,
        };
      },
    }),
  }),
});

export const {
  useGetAllTherapistQuery,
  useCreateTherapistMutation,
  useUpdateTherapistMutation,
} = TherapistApi;
