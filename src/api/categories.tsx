import {
  ICategory,
  TCategoryPageRes,
  IUploadIconBody,
  IUploadIconRes,
} from "../types/category.modal";
import { Api } from "./base";
import { provideTagsType } from "./index.constant";

const categoryApi = Api.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query<TCategoryPageRes, string>({
      query: (arg: string) => {
        return {
          url: `/categories${arg ? `?${arg}` : ""}`,
          method: "GET",
        };
      },
      providesTags: [provideTagsType.category],
    }),
    createCategory: build.mutation<any, ICategory>({
      query: (args) => {
        const formData = new FormData();
        formData.append("faName", args?.faName);
        formData.append("enName", args?.enName);
        if (args.icon) formData.append("icon", args?.icon);
        return {
          url: "/categories",
          method: "POST",
          body: args,
        };
      },
      invalidatesTags: [provideTagsType.category],
    }),
    uploadIcons: build.mutation<IUploadIconRes, IUploadIconBody>({
      query: (arg) => {
        const formData = new FormData();
        formData.append("icon", arg.icon);
        return {
          method: "POST",
          body: formData,
          url: "/categories/upload-icon",
        };
      },
    }),
    deleteCategory: build.mutation<void, number>({
      query: (args) => {
        return {
          url: `/categories/${args}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [provideTagsType.category],
    }),

    updateCategory: build.mutation<void, Partial<ICategory>>({
      query: (arg: Partial<ICategory>) => {
        const formData = new FormData();
        Object.keys(arg).map((e:string) => {
          console.log(e, arg[e]);
        });
        return {
          url: "/categories",
          method: "PATCH",
        };
      },
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUploadIconsMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation
} = categoryApi;
