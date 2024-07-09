import {
  EDegtreeOfEducation,
  EDegtreeOfEducationItems,
  EGender,
} from "../types/therapist.modal";

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

// export const getDaysOfWeek=(num:number)=>{
//   // switch (num){
//   //   case 'شنبه'
//   // }
// }

export enum getDaysOfWeek {
  monday = 1,
}
