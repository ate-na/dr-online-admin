import { IBaseEntity, IDatasourcePageRes } from "./base.modal";

export interface ICategory extends IBaseEntity {
  icon?: string;
  faName: string;
  enName: string;
  therapists?: any[];
}

export interface IUploadIconBody {
  icon: File;
}

export interface IUploadIconRes {
  fileName: string;
}

export type TCategoryPageRes = IDatasourcePageRes<ICategory>;
