import { IUpdateStatus, TOrderPage } from "../types/order.modal";
import { Api } from "./base";
import { provideTagsType } from "./index.constant";

const orderApi = Api.injectEndpoints({
  endpoints: (build) => ({
    getOrders: build.query<TOrderPage, string>({
      query(args) {
        return {
          url: "/orders/page",
          method: "GET",
        };
      },
      providesTags: [provideTagsType.orders],
    }),
    updateStatusOrder: build.mutation<void, IUpdateStatus>({
      query(arg) {
        return {
          url: `/orders/change-status/${arg.id}`,
          method: "PATCH",
          body: { status: arg.status },
        };
      },
      invalidatesTags: [provideTagsType.orders],
    }),
  }),
});

export const { useGetOrdersQuery, useUpdateStatusOrderMutation } = orderApi;
