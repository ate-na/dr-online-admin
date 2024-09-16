import { useForm } from "react-hook-form";
import { TFilterAdmin, TFilterAdminFormValidation } from "./index.types";
import Modal from "../../../components/kits/Modal";
import { Button } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import TextField from "../../../components/kits/TextField";
import { prepareSearchParamsData } from "../../../utils/searchParamsData";
import Select from "../../../components/kits/Select";

const FilterAdminDialog: TFilterAdmin = ({ open = false, handleClose }) => {
  const [searchParams, setSearchParams] = useSearchParams({});

  const { control, handleSubmit } = useForm<TFilterAdminFormValidation>({
    values: {
      firstName: searchParams.get("firstName") || undefined,
      lastName: searchParams.get("lastName") || undefined,
      isActive: !!searchParams.get("isActive")!! || undefined,
      phone: searchParams.get("phone") || undefined,
    },
  });

  const submitHandler = handleSubmit(
    (value) => {
      setSearchParams(() => (prepareSearchParamsData(value) as any) || {});
      handleClose();
    },
    (err) => console.log(err)
  );

  return (
    <Modal
      width="35%"
      open={open}
      handleClose={handleClose}
      title="جستجوی ادمین ها"
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
        <Select
          control={control}
          items={[
            { label: "فعال", value: true },
            { label: "غیرفعال", value: false },
          ]}
          name="isActive"
          selectLabel="وضعیت ادمین"
        />
        <Button type="submit">اعمال جستجو</Button>
      </form>
    </Modal>
  );
};

export default FilterAdminDialog;
