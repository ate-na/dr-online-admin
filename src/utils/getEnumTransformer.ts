import { OrderStatus } from "../types/order.modal";
import {
  EDegtreeOfEducation,
  EDegtreeOfEducationItems,
  EGender,
  TherapistScheduleType,
} from "../types/therapist.modal";
import { TicketStatus } from "../types/ticket.modal";

export const getGenderEnum = (data: EGender | undefined) => {
  switch (data) {
    case EGender.female:
      return "پزشک خانم";
    case EGender.male:
      return "پزشک آقا";
    default:
      return "نام مشخص";
  }
};

export const getDegreeEnum = (data: EDegtreeOfEducation | undefined) => {
  if (!data) return "";
  return EDegtreeOfEducationItems.find((e) => e.value === data)?.label;
};

export const getDaysOfWeekTransalate = (dayOfWeek?: number) => {
  switch (dayOfWeek) {
    case getDaysOfWeek.monday:
      return "دوشنبه";
    case getDaysOfWeek.tuesday:
      return "سه شنبه";
    case getDaysOfWeek.wednesday:
      return "چهار شنبه";
    case getDaysOfWeek.thursday:
      return "پنج شنبه";
    case getDaysOfWeek.friday:
      return "جمعه";
    case getDaysOfWeek.saturday:
      return "شنبه";
    case getDaysOfWeek.sunday:
      return "یک شنبه";
    default:
      return "";
  }
};

export enum getDaysOfWeek {
  monday = 1,
  tuesday = 2,
  wednesday = 3,
  thursday = 4,
  friday = 5,
  saturday = 6,
  sunday = 7,
}

export const TherapistScheduleTypeTranslate = (type: TherapistScheduleType) => {
  switch (type) {
    case TherapistScheduleType.online:
      return "آنلاین";
    case TherapistScheduleType.onsite:
      return "حضوری";
  }
};

export const orderStatusTranslate = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.Cancel:
      return "کنسل شده";
    case OrderStatus.Done:
      return "به اتمام رسیده";
    case OrderStatus.Pending:
      return "در انتظار برگزاری";
  }
};

export const ticketStatusTranslate = (status: TicketStatus) => {
  switch (status) {
    case TicketStatus.Close:
      return "بسته شده";
    case TicketStatus.Open:
      return "درانتظار";
    case TicketStatus.Report:
      return "گزارش شده";
  }
};
