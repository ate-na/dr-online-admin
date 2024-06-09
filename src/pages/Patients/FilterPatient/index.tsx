import { useForm } from "react-hook-form";
import {
  IFilterPatient,
  TFilterPatient,
  TFilterPatientFormValidation,
} from "./index.types";
import Modal from "../../../components/kits/Modal";
import { Button } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import TextField from "../../../components/kits/TextField";
import { prepareSearchParamsData } from "../../../utils/searchParamsData";

const FilterPatientDialog: TFilterPatient = ({ open = false, handleClose }) => {
  const [searchParams, setSearchParams] = useSearchParams({});

  const { control, handleSubmit } = useForm<TFilterPatientFormValidation>({
    values: {
      firstName: searchParams.get("firstName") || undefined,
      lastName: searchParams.get("lastName") || undefined,
      phone: searchParams.get("phone") || undefined,
    },
  });

  const submitHandler = handleSubmit(
    (value) => {
      console.log("the value is", value);
      setSearchParams(() => prepareSearchParamsData(value) || {});
      handleClose();
    },
    (err) => console.log(err)
  );

  return (
    <Modal
      height="60%"
      width="35%"
      open={open}
      handleClose={handleClose}
      title="جستجوی بیمار ها"
    >
      <form
        style={{
          width: "100%",
          display: "flex",
          gap: "1rem",
          flexDirection: "column",
        }}
        onSubmit={submitHandler}
      >
        <TextField
          control={control}
          name="firstName"
          label="نام بیمار"
          helperText="نام بیمار خود را وارد کنید"
        />
        <TextField
          control={control}
          name="lastName"
          label="نام خانوادگی بیمار"
          helperText="نام بیمار خانوادگی خود را وارد کنید"
        />
        <TextField
          control={control}
          name="phone"
          label="شماره تماس"
          helperText="شماره تماس را وارد کنید"
        />
        <Button type="submit">اعمال جستجو</Button>
      </form>
    </Modal>
  );
};

export default FilterPatientDialog;
