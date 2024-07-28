import { TTicketPage } from "../types/ticket.modal";
import { Api } from "./base";

const ticketApi = Api.injectEndpoints({
  endpoints: (build) => ({
    getAllTickets: build.query<TTicketPage, string>({
      query(arg) {
        return {
          url: `/tickets/page?${arg}`,
        };
      },
    }),
  }),
});

export const { useGetAllTicketsQuery } = ticketApi;
