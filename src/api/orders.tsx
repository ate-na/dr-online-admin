import {
  ICreateOrder,
  IOrderEntity,
  IUpdateStatus,
  TOrderPage,
} from "../types/order.modal";
import { Api } from "./base";
import { provideTagsType } from "./index.constant";

export interface IReservationDateBaseTherapist {
  therapistId: number;
  time: string;
  day: number;
}

export interface IResponsegetReservationDate {
  dates: string[];
}

const orderApi = Api.injectEndpoints({
  endpoints: (build) => ({
    getOrders: build.query<TOrderPage, string>({
      query(args) {
        return {
          url: `/orders/page?${args}`,
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
    getReservationDateBaseTherapist: build.query<
      IResponsegetReservationDate,
      IReservationDateBaseTherapist
    >({
      query(arg) {
        return {
          url: `orders/reservation-date/${arg.day}/${arg.therapistId}/${arg.time}`,
          method: "GET",
        };
      },
    }),

    createOrder: build.mutation<IOrderEntity, ICreateOrder>({
      query(arg) {
        return {
          url: "/orders",
          method: "POST",
          body: arg,
        };
      },
      invalidatesTags: [provideTagsType.orders],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useUpdateStatusOrderMutation,
  useGetReservationDateBaseTherapistQuery,
  useCreateOrderMutation,
} = orderApi;
