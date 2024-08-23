import zod from "zod";
export const therapistValidation = zod.object({
  firstName: zod.string({ required_error: "فیلد نام پزشک اجباری میباشد" }),
  lastName: zod.string({
    required_error: "فیلد نام خانوادگی پزشک اجباری میباشد",
  }),
  phone: zod
    .string({ required_error: "شماره تماس اول باید پر شود" })
    .regex(/^(\+98|0)?9\d{9}$/, "شماره تماس وارد شده فرمت نادرستی دارد"),
  phone2: zod
    .string({ required_error: "شماره تماس دوم باید پر شود" })
    .regex(/^(\+98|0)?9\d{9}$/, "شماره تماس وارد شده فرمت نادرستی دارد"),
  degreeOfEducation: zod.string({
    required_error: "مدرک تحصیلی پزشک را انتخاب کنید",
  }),
  workingFields: zod.array(zod.number(), {
    required_error: "باید حداقل یک زمینه تخصصی برای پزشک انتخاب کنید",
  }),
  gender: zod.string({ required_error: "جنسیت پزشک را پر کنید" }),
  address: zod.string({ required_error: "آدرس خونه باید پر شود" }),
  bio: zod.string({ required_error: "فیلد بیوگرافی پزشک را پر کنید" }),
  image: zod.string({ required_error: "" }).optional(),
});
