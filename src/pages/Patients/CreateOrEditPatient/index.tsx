import Modal from "../../../components/kits/Modal";
import {
  TCreateOrEditFormValidation,
  TCreateOrEditPatient,
} from "./index.types";
import TextField from "../../../components/kits/TextField";
import Button from "../../../components/kits/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useCreatePatientMutation,
  useUpdatePatientMutation,
} from "../../../api/patients";
import toast from "react-hot-toast";
import useErrorHandling from "../../../hooks/useErrorHandling";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { IError } from "../../../types/base.modal";
import { patientFormValidations } from "./../index.constants";

const CreateOrEditPatient: TCreateOrEditPatient = ({
  open = false,
  handleClose,
  data,
}) => {
  const { control, handleSubmit, reset } = useForm<TCreateOrEditFormValidation>(
    {
      resolver: zodResolver(patientFormValidations),
      values: { ...data } as any,
    }
  );

  const [onSubmit, submitData] = useCreatePatientMutation();
  const [onUpdate, updateData] = useUpdatePatientMutation();

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
      // toast.error("با شکست مواجه شد");
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
      height="50%"
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
          label="نام بیمار"
          helperText=""
        />
        <TextField
          control={control}
          name="lastName"
          label="نام خانوادگی بیمار"
          helperText=""
        />
        <TextField
          control={control}
          name="phone"
          label="شماره تماس"
          helperText=""
        />
        <Button type="submit" loading={submitData.isLoading}>
          اعمال تغییرات
        </Button>
      </form>
    </Modal>
  );
};
export default CreateOrEditPatient;
