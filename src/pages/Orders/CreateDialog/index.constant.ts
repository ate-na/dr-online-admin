import Zod from "zod";

export const createFormValidation = Zod.object({
  patient: Zod.number({
    required_error: "بیماری که قصد دریافت نوبت رزرو را دارد انتخاب کنید",
  }),
  therapist: Zod.number({
    required_error: "لطفا پزشکی که قصد دریافت رزرو دارید رو انتخاب کنید",
  }),
  categories: Zod.array(Zod.number(), {
    required_error: "این نوبت رزرو در رابطه با کدام زمینه تخصصی میباشد",
  }),
  day: Zod.number({
    required_error: "روزی که قصد دریافت نوبت رزرو را دارید انتخاب کنید",
  }),
  location: Zod.string({}).optional(),
  room: Zod.number({}).optional(),
  date: Zod.string({ required_error: "تاریخ برگزاری این رزرو را انتخاب کنید" }),
  endHour: Zod.string({}).optional(),
  startHour: Zod.string({}).optional(),
  time: Zod.string({ required_error: "بازه زمانی این رزرو را انتخاب کنید" }),
  type: Zod.string({ required_error: "شیوه برگزاری این رزرو را انتخاب کنید" }),
});
