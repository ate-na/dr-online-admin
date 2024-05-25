import { createContext, useState } from "react";
import { IAdmin, ILoginProps } from "../types/admin.modal";
import { IAuthContext, TAuthContextProvider } from "./index.types";
import { useLoginMutation } from "../api/user";

const AuthContext = createContext<IAuthContext>({
  isLoggedIn: false,
  user: undefined,
  token: "",
  Login: (data: ILoginProps) => {},
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
    user,
    isLoggedIn: !!token,
    token,
    user: user as IAdmin,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
