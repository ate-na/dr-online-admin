import { TCreateLocation } from "./index.types";
import Select from "../../../components/kits/Select";
import { useForm } from "react-hook-form";
import TextField from "../../../components/kits/TextField";
import Modal from "../../../components/kits/Modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { locationFormValidation } from "./index.constants";
import useCities from "../../../hooks/useCities";
import {
  useCreateLocationMutation,
  useUpdateLocationMutation,
} from "../../../api/location";
import Button from "../../../components/kits/Button";
import useErrorHandling from "../../../hooks/useErrorHandling";

const CreateLocation: TCreateLocation = ({
  open = false,
  handleClose,
  data,
}) => {
  const { cities, cityLoading } = useCities();
  console.log("data", data);
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(locationFormValidation),
    values: { ...data },
  });

  const [submit, createSubmitData] = useCreateLocationMutation();
  const [handleSubmitUpdateHandler, updateData] = useUpdateLocationMutation();

  console.log(
    "check value",
    {
      isError: createSubmitData.isError || updateData.isError,
      isSuccess: createSubmitData.isSuccess || updateData.isSuccess,
    },
    createSubmitData.isSuccess,
    updateData.isSuccess
  );

  useErrorHandling({
    isError: createSubmitData.isError || updateData.isError,
    isSuccess: createSubmitData.isSuccess || updateData.isSuccess,
  });

  const onSubmit = handleSubmit(
    async (value: any) => {
      if (data && data.id) {
        await handleSubmitUpdateHandler({ ...value, id: data?.id });
        reset();
      } else {
        await submit(value);
        reset();
      }
      handleClose();
    },
    (err) => {
      console.log(err);
    }
  );

  return (
    <Modal
      title="ساخت آدرس جدید"
      flexDirection={"column"}
      justifyContent={"flex-start"}
      alignItems="flex-start"
      bgcolor={"#282E34"}
      p={2}
      width={"40%"}
      height={"50%"}
      open={open}
      handleClose={handleClose}
    >
      <form
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
        onSubmit={onSubmit}
      >
        <Select
          disabled={cityLoading}
          control={control}
          name="city"
          items={cities.map((e) => ({ value: e.id, label: e.name }))}
          selectLabel="شهر"
        />
        <TextField
          control={control}
          name="address"
          label="آدرس محلی"
          helperText=""
          rows={5}
          multiline
        />
        <Button type="submit" fullWidth loading={!!createSubmitData?.isLoading}>
          ذخیره سازی تغییرات
        </Button>
      </form>
    </Modal>
  );
};

export default CreateLocation;
