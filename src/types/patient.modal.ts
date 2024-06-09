import { IBaseEntity, IBaseUser, IDatasourcePageRes } from "./base.modal";

export interface IPatient extends IBaseEntity, IBaseUser {}

export type IPatientPageRes = IDatasourcePageRes<IPatient>;
