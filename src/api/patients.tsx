import { IPatient, TPatientPageRes } from "../types/patient.modal";
import { Api } from "./base";
import { provideTagsType } from "./index.constant";

const PatientSlice = Api.injectEndpoints({
  endpoints: (build) => ({
    getAllPatient: build.query<TPatientPageRes, string>({
      query: (query: string) => {
        return {
          url: `/Patient${query ? `?${query}` : ""}`,
        };
      },
      providesTags: [provideTagsType.patient],
    }),
    deletePatient: build.mutation<void, number>({
      query: (arg) => {
        return {
          url: `/Patient/${arg}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [provideTagsType.patient],
    }),
    createPatient: build.mutation<any, Omit<IPatient, "id">>({
      query: (arg) => {
        return {
          url: "/Patient",
          method: "POST",
          body: arg,
        };
      },
      invalidatesTags: [provideTagsType.patient],
    }),
    updatePatient: build.mutation<any, IPatient>({
      query: (arg: IPatient) => {
        return {
          url: `/Patient/${arg.id}`,
          method: "PATCH",
          body: arg,
        };
      },
      invalidatesTags: [provideTagsType.patient],
    }),
  }),
});

export const {
  useGetAllPatientQuery,
  useCreatePatientMutation,
  useUpdatePatientMutation,
  useDeletePatientMutation,
} = PatientSlice;
