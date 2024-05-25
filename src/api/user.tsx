import { ILoginProps, IResLogin } from "../types/admin.modal";
import { Api } from "./base";

const userSlice = Api.injectEndpoints({
  endpoints: (build) => ({
    Login: build.mutation<IResLogin, ILoginProps>({
      query: (body) => {
        return {
          url: "/auth/login/admin",
          body,
          method: "POST",
        };
      },
    }),
  }),
});

export const { useLoginMutation } = userSlice;
