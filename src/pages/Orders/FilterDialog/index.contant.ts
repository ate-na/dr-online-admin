import zod from "zod";
export const filterFormValidation = zod.object({
  status: zod.string().optional(),
});
