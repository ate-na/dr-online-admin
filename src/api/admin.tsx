import { IAdmin, TAdminPageRes } from "../types/admin.modal";
import { Api } from "./base";
import { provideTagsType } from "./index.constant";

const AdminSlice = Api.injectEndpoints({
  endpoints: (build) => ({
    getAllAdmin: build.query<TAdminPageRes, string>({
      query: (query: string) => {
        console.log("query", query);
        return {
          url: `/admin${query ? `?${query}` : ""}`,
        };
      },
      providesTags: [provideTagsType.admin],
    }),
    deleteAdmin: build.mutation<void, number>({
      query: (arg) => {
        return {
          url: `/admin/${arg}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [provideTagsType.admin],
    }),
    createAdmin: build.mutation<any, Omit<IAdmin, "id">>({
      query: (arg) => {
        return {
          url: "/admin",
          method: "POST",
          body: arg,
        };
      },
      invalidatesTags: [provideTagsType.admin],
    }),
    updateAdmin: build.mutation<any, IAdmin>({
      query: (arg: IAdmin) => {
        return {
          url: `/admin/${arg.id}`,
          method: "PATCH",
          body: arg,
        };
      },
      invalidatesTags: [provideTagsType.admin],
    }),
  }),
});

export const {
  useGetAllAdminQuery,
  useDeleteAdminMutation,
  useCreateAdminMutation,
  useUpdateAdminMutation,
} = AdminSlice;
