import zod from "zod";

export const therapistFilterValidation = zod.object({
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
  phone: zod
    .string()
    .regex(/^(\+98|0)?9\d{9}$/, "شماره تماس وارد شده فرمت نادرستی دارد")
    .optional(),
});
