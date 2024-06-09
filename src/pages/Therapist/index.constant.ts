import { IColumns } from "../../components/kits/Table/index.types";
import { EGender, ITherapist } from "../../types/therapist.modal";

export const TherapistColumns: IColumns[] = [
  { label: "id", name: "سریال پزشک" },
  {
    label: "name",
    name: "نام و نام خانوادگی",
    transform: (data) => {
      return data.firstName + "" + data.lastName;
    },
  },
  { label: "phone", name: "شماره تماس 1" },
  { label: "phone2", name: "شماره تماس 2" },
  {
    label: "gender",
    name: "جنسیت",
    transform: (data: ITherapist) => {
      return data.gender === EGender.male
        ? "مرد"
        : data.gender === EGender.female
        ? "زن"
        : "نامشخص";
    },
  },
];
