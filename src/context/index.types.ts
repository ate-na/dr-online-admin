import { FC, PropsWithChildren } from "react";
import { IAdmin, ILoginProps } from "../types/admin.modal";

export interface IAuthContext {
  isLoggedIn: boolean;
  user: IAdmin | undefined;
  token: string;
  Login: (data: ILoginProps) => void;
  Logout?: () => void;
}

export interface ILoginData {
  mobile: string;
  password: string;
}

interface IAuthContextProvider extends PropsWithChildren {}

export type TAuthContextProvider = FC<IAuthContextProvider>;
