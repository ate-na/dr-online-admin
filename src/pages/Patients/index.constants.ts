import { IColumns } from "../../components/kits/Table/index.types";
import zod from "zod";
export const PatientColumns: IColumns[] = [
  { label: "id", name: "سریال بیمار" },
  { label: "firstName", name: "نام بیمار" },
  { label: "lastName", name: "نام خانوادگی بیمار" },
  { label: "phone", name: "شماره تماس" },
  // { label: "phone", name: "شماره تماس" },
];

export const patientFormValidations = zod.object({
  firstName: zod
    .string({ message: "نام بیمار باید حداقل 3 حرف داشته باشد" })
    .min(3),
  lastName: zod
    .string({ message: "نام خانوادگی بیمار باید حداقل 3 حرف داشته باشد" })
    .min(3),
  phone: zod
    .string({ message: "شماره تماس وارد شده فرمت نادرستی دارد" })
    .regex(/^(\+98|0)?9\d{9}$/, "شماره تماس وارد شده فرمت نادرستی دارد"),
});
