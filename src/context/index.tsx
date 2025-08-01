import { createContext, useState } from "react";
import { IAdmin, ILoginProps } from "../types/admin.modal";
import { IAuthContext, TAuthContextProvider } from "./index.types";
import { useLoginMutation } from "../api/user";
import toast from "react-hot-toast";

const AuthContext = createContext<IAuthContext>({
  isLoggedIn: false,
  user: undefined,
  token: "",
  Login: () => {},
  Logout: () => {},
});

export const AuthContextProvider: TAuthContextProvider = ({ children }) => {
  const [user, setUser] = useState<IAdmin | undefined>(
    JSON.parse(localStorage.getItem("user") as any) || undefined
  );
  const [token, setToken] = useState<string>(
    localStorage.getItem("token") || ""
  );

  const [submit] = useLoginMutation();

  const Login = async (data: ILoginProps) => {
    const res = await submit(data);
    if (res?.data?.user && res?.data?.token) {
      setUser(() => res.data.user);
      setToken(() => res.data.token);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res?.data?.user));
      toast.success("ورود به حساب کاربری با موفقیت انجام شد");
    }
  };

  const Logout = () => {
    localStorage.clear();
    setUser(() => undefined);
    setToken(() => "");
  };

  const context: IAuthContext = {
    Login,
    Logout,
    user: user,
    isLoggedIn: !!token,
    token,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
