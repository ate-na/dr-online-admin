import { FC } from "react";
import { ICreateOrEditProps } from "../../../types/base.modal";
import { ITherapist } from "../../../types/therapist.modal";
import zod from 'zod'
import { therapistValidation } from "./index.constant";

export interface ICreateOrEdit extends ICreateOrEditProps<ITherapist>{}

export type TCreateOrEditFC=FC<ICreateOrEdit>

export type TCreateOrEditFormValidation=zod.infer<typeof therapistValidation>