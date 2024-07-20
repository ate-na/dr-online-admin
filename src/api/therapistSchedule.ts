import {
  TTherapistSchedulesResPerDay,
  TTherapistSchedulesPageRes,
} from "../types/therapist.modal";
import { Api } from "./base";
import { provideTags, provideTagsType } from "./index.constant";

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
      providesTags: [provideTagsType.therapistSchedule],
    }),
    deleteTherapistSchedule: build.mutation<void, number>({
      query(arg) {
        return {
          url: `/therapist-schedules/${arg}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [provideTagsType.therapistSchedule],
    }),
    TherapistSchedule: build.query<
      TTherapistSchedulesPageRes,
      number | undefined
    >({
      query(arg) {
        return {
          url: `therapist-schedules/therapist/${arg}?limit=5000`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetTherapistSchedulesPerDayQuery,
  useGetTherapistSchedulesChartDetailQuery,
  useDeleteTherapistScheduleMutation,
  useTherapistScheduleQuery,
} = TherapistScheduleApi;
