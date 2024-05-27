import { TCreateLocation } from "./index.types";
import Select from "../../../components/kits/Select";
import { useForm } from "react-hook-form";
import TextField from "../../../components/kits/TextField";
import Modal from "../../../components/kits/Modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { locationFormValidation } from "./index.constants";
import useCities from "../../../hooks/cities";
import { useCreateLocationMutation } from "../../../api/location";
import Button from "../../../components/kits/Button";
import { useEffect } from "react";
import toast from "react-hot-toast";

const CreateLocation: TCreateLocation = ({ open = false, handleClose }) => {
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(locationFormValidation),
  });

  const [submit, { isLoading, isSuccess, isError, error }] =
    useCreateLocationMutation();

  const { cities, cityLoading } = useCities();
  const onSubmit = handleSubmit(
    async (data: any) => {
      await submit(data);
    },
    (err) => {
      console.log(err);
    }
  );

  useEffect(() => {
    if (isSuccess) {
      toast.success("با موفقیت ایجاد شد");
      reset();
      handleClose();
    } else if (isError && error) {
      toast.error("با شکست مواجه شد");
    }
  }, [isSuccess]);

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
        <Button type="submit" fullWidth loading={isLoading}>
          ذخیره سازی تغییرات
        </Button>
      </form>
    </Modal>
  );
};

export default CreateLocation;
