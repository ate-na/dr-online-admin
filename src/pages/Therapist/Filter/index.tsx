import { useForm } from "react-hook-form";
import Modal from "../../../components/kits/Modal";
import TextField from "../../../components/kits/TextField";
import { TFilterFormValidation, TFilterTherapist } from "./index.types";
import Button from "../../../components/kits/Button";
import { useSearchParams } from "react-router-dom";
import { prepareSearchParamsData } from "../../../utils/searchParamsData";

const FilterTherapist: TFilterTherapist = ({ handleClose, open = false }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { control, handleSubmit } = useForm<TFilterFormValidation>({
    values: {
      firstName: searchParams.get("firstName") || undefined,
      lastName: searchParams.get("lastName") || undefined,
      phone: searchParams.get("phone") || undefined,
    },
  });

  const onSubmit = handleSubmit((value) => {
    console.log("value is", value);
    setSearchParams(() => prepareSearchParamsData(value));
    handleClose();
  });

  return (
    <Modal width="30%" title="فیلتر جدول" open={open} handleClose={handleClose}>
      <form
        onSubmit={onSubmit}
        style={{
          display: "flex",
          gap: "1rem",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <TextField
          control={control}
          label="نام پزشک"
          name="firstName"
          helperText=""
        />
        <TextField
          control={control}
          label="نام خانوادگی پزشک"
          name="lastName"
          helperText=""
        />
        <TextField
          control={control}
          label="شماره موبایل"
          name="phone"
          helperText=""
        />
        <Button type="submit">ثبت تغییرات</Button>
      </form>
    </Modal>
  );
};
export default FilterTherapist;
