import { IColumns } from "../../components/kits/Table/index.types";
import { TherapistScheduleTypeTranslate } from "../../utils/getEnumTransformer";

export const TherapistScheduleColumns: IColumns[] = [
  {
    label: "id",
    name: "آیدی",
  },
  {
    label: "startHour",
    name: "ساعت شروع جلسه",
  },
  {
    label: "endHour",
    name: "ساعت پایان رزرو",
  },
  {
    label: "type",
    name: "نوع جلسه رزرو",
    transform(data) {
      return TherapistScheduleTypeTranslate(data?.type);
    },
  },
  {
    label: "location",
    name: "آدرس برگزاری",
    transform(data) {
      console.log(data);
      return data?.location?.address;
    },
  },
  {
    label: "room",
    name: "اتاق",
  },
];
