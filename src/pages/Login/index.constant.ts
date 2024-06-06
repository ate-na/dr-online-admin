import zod from "zod";

export const loginFormValidation = zod.object({
  phone: zod
    .string({ required_error: "لطفا شماره تماس خود را وارد کنید" })
    .min(11, "فرمت شماره تماس شما اشتباه میباشد"),
  password: zod
    .string({ required_error: "لطفا گذرواژه خود را وارد کنید" })
    .min(8, "گذروازه شما باید حداقل ۸ کاراکتر باشد"),
});
