import { TTherapistSchedulesPageRes } from "../types/therapist.modal";
import { Api } from "./base";

const TherapistScheduleApi = Api.injectEndpoints({
  endpoints: (build) => ({
    getTherapistSchedulesPerDay: build.query<
      TTherapistSchedulesPageRes,number>({
      query: (arg) => {
        return {
          url: `therapist-schedules/therapist/per-day/${arg}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {useGetTherapistSchedulesPerDayQuery} = TherapistScheduleApi;
