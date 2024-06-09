import { IChangePasswordData } from "../components/ui/ChangePassword/index.types";
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
    updatePassword: build.mutation<{ message: boolean }, IChangePasswordData>({
      query: (args) => {
        return {
          url: `/auth/change-password/admin/${args?.id}`,
          method: "PATCH",
          body: args,
        };
      },
    }),
  }),
});

export const { useLoginMutation, useUpdatePasswordMutation } = userSlice;
