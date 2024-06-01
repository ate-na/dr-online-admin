export interface BaseEntity {
  id: string;
}

export interface IBaseUser {
  firstName: string;
  lastName: string;
  phone: string;
}

export interface IResponse<T> {
  data: T;
}

export interface IDatasourcePageRes<T> {
  content: T[];
  count: number;
}

export interface ILocatioQuery {
  page?: number;
}

export type TProvideTags = "locations";
