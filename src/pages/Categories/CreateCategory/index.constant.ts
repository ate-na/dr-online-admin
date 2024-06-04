import zod from "zod";

export const createCategoryValidation = zod.object({
  faName: zod
    .string({ required_error: "نام فارسی اجباری است" })
    .min(3, "نام فارسی حداقل باید 3 کاراکتری باشد"),
  enName: zod
    .string({ required_error: "نام انگلیسی اجباری است" })
    .min(3, "نام انگلیسی باید 3 کاراکتری باشد"),
});
