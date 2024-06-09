import { useForm } from "react-hook-form";
import Modal from "../../kits/Modal";
import TextField from "../../kits/TextField";
import {
  TChangePasswordDialog,
  TCreateOrEditFormValidation,
} from "./index.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordFormValidaion } from "./index.contant";
import Button from "../../kits/Button";
import { useUpdatePasswordMutation } from "../../../api/user";
import toast from "react-hot-toast";

const ChangePasswordDialog: TChangePasswordDialog = ({
  open = false,
  handleClose,
  data,
}) => {
  const { control, handleSubmit, reset } = useForm<TCreateOrEditFormValidation>(
    {
      resolver: zodResolver(changePasswordFormValidaion),
    }
  );

  const [handleUpdatePassword, updatePasswordData] =
    useUpdatePasswordMutation();

  const onSubmitForm = handleSubmit(
    async (value) => {
      console.log("value is", value);
      if (value && data?.id) {
        const res = await handleUpdatePassword({ id: data?.id, ...value });
        console.log(res.data?.message);
        if (!!res.data?.message) {
          toast.success("باموفقیت انجام شد");
        } else {
          toast.error("با شکست مواجه شد");
        }
        reset({ currentPassword: "", password: "" });
        handleClose();
      }
    },
    (err) => console.log(err)
  );

  return (
    <Modal
      width="30%"
      height="40%"
      open={open}
      handleClose={handleClose}
      title="ویرایش پسوورد"
    >
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "100%",
        }}
        onSubmit={onSubmitForm}
      >
        <TextField
          control={control}
          helperText=""
          name="currentPassword"
          label="گذرواژه فعلی"
          type="password"
        />
        <TextField
          control={control}
          helperText=""
          name="password"
          label="گذرواژه جدید"
          type="password"
        />
        <Button loading={updatePasswordData.isLoading} type="submit">
          ثبت تغییرات
        </Button>
      </form>
    </Modal>
  );
};
export default ChangePasswordDialog;
