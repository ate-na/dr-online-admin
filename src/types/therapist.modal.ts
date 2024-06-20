import { IBaseEntity, IBaseUser, IDatasourcePageRes } from "./base.modal";
import { ICategory } from "./category.modal";
import { ILocation } from "./location.model";

export enum EDegtreeOfEducation {
  diploma = "diploma",
  associate = "associate",
  bachelor = "bachelor",
  master = "master",
  doctorate = "doctorate",
}

export const EDegtreeOfEducationItems = [
  { value: EDegtreeOfEducation.associate, label: "فوق دیپلم" },
  { value: EDegtreeOfEducation.diploma, label: "دیپلم" },
  { value: EDegtreeOfEducation.bachelor, label: "کارشناسی" },
  { value: EDegtreeOfEducation.master, label: "ارشد" },
  { value: EDegtreeOfEducation.doctorate, label: "دکترا" },
];

export enum ETherapistScheduleType {
  online = "online",
  onsite = "onsite",
  both = "both",
}

export enum EGender {
  male = "male",
  female = "female",
  unknown = "unknown",
}

export const GenderItems = [
  { value: EGender.unknown, label: "نامشخصی" },
  { value: EGender.female, label: "زن" },
  { value: EGender.male, label: "مرد" },
];

export type TTherapistsPageRes = IDatasourcePageRes<ITherapist>;

export type TTherapistSchedulesPageRes =
  IDatasourcePageRes<ITherapistSchedules>;

//   export type TTherapistSchedulesDayOffPageRes = IDatasourcePageRes<ITherapistSchedulesOff>;

export type TTherapistSchedulesResPerDay = {
  day: number;
  items: ITherapistSchedules[];
};

export interface ITherapistUploadRes {
  filePath: string;
}
export interface ITherapist extends IBaseEntity, IBaseUser {
  phone2: string;
  bio: string;
  address: string;
  degreeOfEducation: EDegtreeOfEducation;
  gender: EGender;
  image: string;
  workingFields: ICategory[];
  schedules: ITherapistSchedules[];
}

export interface ITherapistSchedules extends IBaseEntity {
  therapist: ITherapist;
  day: number;
  startHour: string;
  endHour: string;
  location: ILocation;
  type: ETherapistScheduleType;
  room: number;
}

export interface ICreateOrEditTherapistReqBody {
  phone2: string;
  bio: string;
  address: string;
  degreeOfEducation: EDegtreeOfEducation;
  gender: EGender;
  image: string;
  workingFields: number[];
}
