import zod from "zod";

export const createTherapistScheduleForm = zod.object({
  therapist: zod.string(),
  day: zod.string(),
  endTime: zod.string({ required_error: "ساعت پایان جلسه رزرو را وارد کنید" }),
  room: zod.number({ required_error: "اتاق برگزاری رزرو را وارد کنید" }),
  startTime: zod.string({ required_error: "ساعت شروع جلسه رزرو را وارد کنید" }),
  type: zod.string({ required_error: "نوع برگزاری رزرو را وارد کنید" }),
  location: zod.number({
    required_error: "آدرس محل برگزاری رزرو را انتخاب کنید",
  }),
});
