import {
  TTherapistSchedulesResPerDay,
  TTherapistSchedulesPageRes,
} from "../types/therapist.modal";
import { Api } from "./base";

const TherapistScheduleApi = Api.injectEndpoints({
  endpoints: (build) => ({
    getTherapistSchedulesPerDay: build.query<
      TTherapistSchedulesResPerDay[],
      number
    >({
      query: (arg) => {
        return {
          url: `therapist-schedules/therapist/per-day/${arg}`,
          method: "GET",
        };
      },
    }),

    getTherapistSchedulesChartDetail: build.query<
      TTherapistSchedulesPageRes,
      { day: number; therapist: number }
    >({
      query(arg) {
        return `therapist-schedules/therapist/${arg?.therapist}/day/${arg?.day}`;
      },
    }),
  }),
});

export const {
  useGetTherapistSchedulesPerDayQuery,
  useGetTherapistSchedulesChartDetailQuery,
} = TherapistScheduleApi;
