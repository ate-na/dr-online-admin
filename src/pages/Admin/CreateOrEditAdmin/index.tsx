import Modal from "../../../components/kits/Modal";
import { TCreateOrEditAdmin, TCreateOrEditFormValidation } from "./index.types";
import TextField from "../../../components/kits/TextField";
import Button from "../../../components/kits/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "../../../components/kits/Select";
import {
  useCreateAdminMutation,
  useUpdateAdminMutation,
} from "../../../api/admin";
import toast from "react-hot-toast";
import useErrorHandling from "../../../hooks/useErrorHandling";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { IError } from "../../../types/base.modal";
import { adminFormValidation } from "../index.constants";

const itemsActive = [
  { label: "فعال", value: true },
  { label: "غیرفعال", value: false },
];

const CreateOrEditAdmin: TCreateOrEditAdmin = ({
  open = false,
  handleClose,
  data,
}) => {
  const { control, handleSubmit, reset } = useForm<TCreateOrEditFormValidation>(
    {
      resolver: zodResolver(adminFormValidation),
      values: { ...data } as any,
    }
  );

  const [onSubmit, submitData] = useCreateAdminMutation();
  const [onUpdate, updateData] = useUpdateAdminMutation();

  const closeModalHandler = () => {
    handleClose();
  };
  const onSubmitHandler = handleSubmit(
    (value) => {
      if (value) {
        if (data?.id) {
          const values = { ...value, id: data.id };
          if (values.password) {
            delete values?.password;
          }
          onUpdate(values);
          reset({
            firstName: "",
            isActive: undefined,
            lastName: "",
            password: "",
            phone: "",
          });
          handleClose();
        } else {
          onSubmit({
            ...value,
            isActive: !!value.isActive,
          });
          reset();
          handleClose();
        }
      }
    },
    (err) => {
      console.log(err);
      toast.error("با شکست مواجه شد");
    }
  );

  useErrorHandling({
    isSuccess: submitData.isSuccess || updateData.isSuccess,
    isError: submitData.isError || updateData.isError,
    errorMessage:
      ((submitData.error as FetchBaseQueryError)?.data as IError)?.message ||
      ((updateData.error as FetchBaseQueryError)?.data as IError)?.message,
  });

  return (
    <Modal
      height="80%"
      title="افزودن زمینه جدید"
      open={open}
      handleClose={closeModalHandler}
    >
      <form
        style={{
          width: "100%",
          display: "flex",
          gap: "1rem",
          flexDirection: "column",
        }}
        onSubmit={onSubmitHandler}
      >
        <TextField
          control={control}
          name="firstName"
          label="نام ادمین"
          helperText="نام ادمین خود را وارد کنید"
        />
        <TextField
          control={control}
          name="lastName"
          label="نام خانوادگی ادمین"
          helperText="نام ادمین خانوادگی خود را وارد کنید"
        />
        <TextField
          control={control}
          name="phone"
          label="شماره تماس"
          helperText="شماره تماس را وارد کنید"
        />
        {!data?.id && (
          <TextField
            control={control}
            type="password"
            name="password"
            label="گذرواژه"
            helperText="گذرواژه را وارد کنبد"
          />
        )}
        <Select
          control={control}
          items={itemsActive}
          name="isActive"
          selectLabel="وضعیت ادمین"
          defaultValue={false}
        />
        <Button type="submit" loading={submitData.isLoading}>
          اعمال تغییرات
        </Button>
      </form>
    </Modal>
  );
};
export default CreateOrEditAdmin;
