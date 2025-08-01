import { IDatasourcePageRes } from "./base.modal";

export interface ICity {
  id: number;
  title: string;
  slug: string;
  province_id: number;
  latitude: number;
  longitude: number;
  name: string;
}

export interface ILocation {
  id: number;
  city: string;
  address: string;
  room?: number;
}

export type TLocationPageRes = IDatasourcePageRes<ILocation>;

export type TCreateOrEditLocationReqBody = ILocation;

export type TCreateOrUpdateResponse = [number, ILocation];

// export interface IUpdateResponse
