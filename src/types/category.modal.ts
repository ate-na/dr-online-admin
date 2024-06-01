import { IDatasourcePageRes } from "./base.modal";

export interface ICategory {
  id?: number;
  icons?: string;
  faName?: string;
  enName?: string;
  therapists: any[];
}

export type TCategoryPageRes = IDatasourcePageRes<ICategory>;
