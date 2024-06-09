import { IColumns } from "../../components/kits/Table/index.types";
import zod from "zod";
export const Admincolumns: IColumns[] = [
  { label: "firstName", name: "نام" },
  { label: "lastName", name: "نام خانوادگی" },
  { label: "phone", name: "موبایل" },
  {
    label: "isActive",
    name: "فعال",
    onLabel: "فعال",
    offLable: "غیرفعال",
  },
];

export const adminFormValidation = zod.object({
  firstName: zod
    .string({ message: "نام ادمین باید حداقل 3 حرف داشته باشد" })
    .min(3),
  lastName: zod
    .string({ message: "نام خانوادگی ادمین باید حداقل 3 حرف داشته باشد" })
    .min(3),
  phone: zod
    .string({ message: "شماره تماس وارد شده فرمت نادرستی دارد" })
    .regex(/^(\+98|0)?9\d{9}$/, "شماره تماس وارد شده فرمت نادرستی دارد"),
  password: zod
    .string({ required_error: "گذرواژه خود را وارد کنید" })
    .min(8, "گذرواژه باید 8 کاراکتر داشته باشد"),
  isActive: zod.boolean().optional(),
});
