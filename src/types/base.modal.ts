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
