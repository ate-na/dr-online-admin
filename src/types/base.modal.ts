export interface IBaseEntity {
  id: number;
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

export interface IError {
  error: string;
  message: string;
  statusCode: number;
}

export interface ICreateOrEditProps<T> extends IModalProps {
  data?: T;
}

export interface IModalProps {
  open?: boolean;
  handleClose: () => void;
}
