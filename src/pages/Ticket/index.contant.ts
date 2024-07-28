import { IColumns } from "../../components/kits/Table/index.types";
import { ticketStatusTranslate } from "../../utils/getEnumTransformer";
import momentJalali from "moment-jalaali";
import moment from "moment";

export const ticketColumns: IColumns[] = [
  { name: "سریال تیکت", label: "id" },
  { name: "موضوع", label: "title" },
  {
    name: "ایجاد توسط",
    label: "patient",
    transform(data) {
      return `${data.patient.firstName} ${data.patient.lastName}`;
    },
  },
  {
    name: "وضعیت",
    label: "status",
    transform(data) {
      return ticketStatusTranslate(data.status);
    },
  },
  {
    name: "حاوی تیکت زیر مجموعه",
    label: "childrens",
    transform(data) {
      return data.childrens.length > 0 ? "بله" : "خیر";
    },
  },
  {
    name: "تاریخ ثبت",
    label: "createdAt",
    transform(data) {
      return momentJalali(data.createdAt).format("jYYYY/jM/jD HH:mm");
    },
  },
  {
    name: "تاریخ بسته شدن",
    label: "closeAt",
    transform(data) {
      return momentJalali(data.closeAt).format("jYYYY/jM/jD HH:mm");
    },
  },
  {
    name: "تاریخ ثبت پاسخ",
    label: "answerAt",
    transform(data) {
      return data.answerAt ?  momentJalali(data.answerAt).format("jYYYY/jM/jD HH:mm") :"-";
    },
  },
];
