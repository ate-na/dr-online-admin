import { FC } from "react";
import { ICreateOrEditProps } from "../../../types/base.modal";
import { ITherapist } from "../../../types/therapist.modal";

export interface IDetailTherapistModal extends ICreateOrEditProps<ITherapist> {}

export type TDetailTherapistModal = FC<IDetailTherapistModal>;
