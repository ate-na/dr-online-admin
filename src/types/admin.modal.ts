import { BaseEntity, IBaseUser } from "./base.modal";

export interface IAdmin extends IBaseUser, BaseEntity {
  isActive: boolean;
  password: string;
}

export interface IDatasourcePageRes<IEntity> {
  content: IEntity[];
  count: number;
}

export interface IResLogin {
  user: IAdmin;
  token: string;
}


export interface ILoginProps{
    phone:string,
    password:string
}