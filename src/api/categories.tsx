import { TCategoryPageRes } from "../types/category.modal";
import { Api } from "./base";

const categoryApi = Api.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query<TCategoryPageRes, string>({
      query: (arg: string) => {
        return {
          url: `/categories${arg ? `?${arg}` : ""}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryApi;
