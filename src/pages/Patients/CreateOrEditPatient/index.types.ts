import { FC } from "react";
import { ICreateOrEditProps } from "../../../types/base.modal";
import { z } from "zod";
import { x } from "../index.constants";
import { IPatient } from "../../../types/patient.modal";

interface ICreateOrEditPatientProps extends ICreateOrEditProps<IPatient> {}

export type TCreateOrEditPatient = FC<ICreateOrEditPatientProps>;

export type TCreateOrEditFormValidation = z.infer<typeof x>;
