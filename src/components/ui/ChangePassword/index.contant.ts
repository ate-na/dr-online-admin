import { z } from "zod";

export const changePasswordFormValidaion = z.object({
  currentPassword: z
    .string({ required_error: "گذرواژه فعلی خود را وارد کنید" })
    .min(8, "گذرواژه فعلی باید حداقل 8 حرف داشته باشد"),
  password: z
    .string({ required_error: "گذرواژه جدید خود را وارد کنید" })
    .min(8, "گذرواژه جدید باید حداقل 8 حرف داشته باشد"),
});
