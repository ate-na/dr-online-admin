import { Api } from "./base";

export interface IReservationDateBaseTherapist {
  therpistId: number;
  time: string;
  day: number;
}

const ReservationDate = Api.injectEndpoints({
  endpoints: (build) => ({
    getReservationDateBaseTherapist: build.query<
      string[],
      IReservationDateBaseTherapist
    >({
      query(arg) {},
    }),
  }),
});
