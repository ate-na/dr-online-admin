import zod from "zod";
export const filterFormValidation = zod.object({
  faName: zod.string().optional(),
  enName: zod.string().optional(),
});
