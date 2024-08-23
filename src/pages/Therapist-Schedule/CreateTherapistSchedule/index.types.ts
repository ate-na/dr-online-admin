import { FC } from "react";
import { IModalProps } from "../../../types/base.modal";
import { createTherapistScheduleForm } from "./index.contant";
import { ITherapist } from "../../../types/therapist.modal";

export interface ICreateTherapistSchedule extends IModalProps {
  therapist?: ITherapist;
  dayOfWeek?: number;
}

export type TCreateTherapistSchedule = FC<ICreateTherapistSchedule>;

export type TCreateTherapistForm = Zod.infer<
  typeof createTherapistScheduleForm
>;
