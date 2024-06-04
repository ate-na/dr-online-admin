import { useForm } from "react-hook-form";
import Modal from "../../../components/kits/Modal";
import TextField from "../../../components/kits/TextField";
import { TFilterCategory, TFilterCategoryFormValidation } from "./index.types";
import Button from "../../../components/kits/Button";
import { useSearchParams } from "react-router-dom";
import { prepareSearchParamsData } from "../../../utils/searchParamsData";

const FilterCategoryForm: TFilterCategory = ({
  open = false,
  handleClose,
  handleSubmit: handleSubmitFilterForm,
}) => {
  const { control, handleSubmit, reset } =
    useForm<TFilterCategoryFormValidation>();

  const [_, setSearchParams] = useSearchParams({});
  const onSubmit = handleSubmit(
    (value) => {
      console.log("the value is", value);
      setSearchParams(() => prepareSearchParamsData(value));
      handleSubmitFilterForm();
      reset();
      handleClose();
    },
    (error) => {
      console.log("the error is", error);
    }
  );

  const handleOnClose = () => {
    reset();
    handleOnClose();
  };

  return (
    <Modal
      height="40%"
      width="35%"
      title="جست جوی جدول زمینه ها"
      open={open}
      handleClose={handleOnClose}
    >
      <form
        onSubmit={onSubmit}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <TextField
          control={control}
          label="نام فارسی زمینه"
          name="faName"
          helperText=""
        />
        <TextField
          control={control}
          label="نام انگلیسی زمینه"
          name="enName"
          helperText=""
        />
        <Button type="submit">اعمال جستجو</Button>
      </form>
    </Modal>
  );
};
export default FilterCategoryForm;
